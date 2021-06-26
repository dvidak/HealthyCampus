import Axios from 'axios';
import querystring from 'querystring';
import { fitbitHeaderAppAuthorization } from '../common';
import { connection } from '../connection/Connection';
import { User } from '../entity/User';

class FitbitActivityService {
  public async loadActivityTypes() {
    try {
      const fitbitResponse = await Axios.get(
        'https://api.fitbit.com/1/activities/[activity-id].json',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkNER0IiLCJzdWIiOiI5QkQzMlEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjE4NzY2OTQ2LCJpYXQiOjE2MTg3MzgxNDZ9.h2tVzB4xyRoEUgOtMJ9JG6FniBxCr6E1iGf4jgfN7MQ',
          },
        },
      );

      const mappedActivities = this.mapActivityCategories(
        fitbitResponse.data.categories,
      );
      return mappedActivities;
    } catch (error) {
      return error;
    }
  }

  public mapActivityCategories(categories: any[]) {
    let mapped = [];

    categories.forEach((category) => {
      const type = category.name;
      const add = category.activities.map((activity) => ({
        type,
        subType: activity.name,
        fitbitActivityId: activity.id,
      }));

      mapped.push(...add);
    });

    return mapped;
  }

  public async getActivities(user: User, endpoint: string) {
    let conn = await connection;

    if (!user.fitbit) {
      throw new Error('User does not have Fitbit Account assigned!');
    }

    const requestUrl = `https://api.fitbit.com/1/user/${user.fitbit.fitbitId}/${endpoint}`;

    try {
      // Fetch and return
      const fitbitResponse = await Axios.get(requestUrl, {
        headers: { Authorization: `Bearer ${user.fitbit.accessToken}` },
      });

      return fitbitResponse.data;
    } catch (error) {
      if (error.response.status === 401) {
        const refreshRequestData = {
          grant_type: 'refresh_token',
          refresh_token: user.fitbit.refreshToken,
        };

        const fitbitResponse = await Axios.post(
          `https://api.fitbit.com/oauth2/token`,
          querystring.stringify(refreshRequestData),
          {
            headers: { Authorization: 'Basic ' + fitbitHeaderAppAuthorization },
          },
        );

        const newAccessToken = fitbitResponse.data.access_token;
        const newRefreshToken = fitbitResponse.data.refresh_token;
        user.fitbit.accessToken = newAccessToken;
        user.fitbit.refreshToken = newRefreshToken;
        await conn.manager.save(user.fitbit);

        // Fetch and return
        try {
          const fitbitResponse = await Axios.get(requestUrl, {
            headers: { Authorization: `Bearer ${user.fitbit.accessToken}` },
          });
          return fitbitResponse.data;
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  public async getPeriodicDataBasedOnDates(
    user: User,
    endpoint: string,
    baseDate: string,
    endDate: string,
  ) {
    const key = `activities-${endpoint}`;

    const response = await this.getActivities(
      user,
      `activities/${endpoint}/date/${baseDate}/${endDate}.json`,
    );

    return response[key];
  }

  public async getPeriodicData(user: User, endpoint: string) {
    const key = `activities-${endpoint}`;

    const endpointToday = await this.getActivities(
      user,
      `activities/${endpoint}/date/today/1d.json`,
    );

    const endpoint7dayData = await this.getActivities(
      user,
      `activities/${endpoint}/date/today/7d.json`,
    );

    const sum7days = endpoint7dayData[key]
      .map((a) => Number(a.value))
      .reduce((a, b) => a + b);

    const endpointMonthData = await this.getActivities(
      user,
      `activities/${endpoint}/date/today/1m.json`,
    );

    const sumMonthData = endpointMonthData[key]
      .map((a) => Number(a.value))
      .reduce((a, b) => a + b);

    const endpointYearData = await this.getActivities(
      user,
      `activities/${endpoint}/date/today/1m.json`,
    );

    const sumYearData = endpointYearData[key]
      .map((a) => Number(a.value))
      .reduce((a, b) => a + b);

    return {
      today: endpointToday[key][0].value,
      lastWeek: sum7days,
      lastMonth: sumMonthData,
      lastYear: sumYearData,
    };
  }
}

export = new FitbitActivityService();
