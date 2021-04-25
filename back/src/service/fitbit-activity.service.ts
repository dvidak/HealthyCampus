import Axios from 'axios';
import ActivityType from '../controller/ActivityType';

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
}

export = new FitbitActivityService();
