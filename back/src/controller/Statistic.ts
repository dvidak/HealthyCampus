import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { User } from '../entity/User';
import { UserActivity } from '../entity/UserActivity';
import { UserUnit } from '../entity/UserUnit';
import ActivityType from './ActivityType';

const buckets = [
  {
    name: '0%-10%',
    min: 0,
    max: 10,
  },
  {
    name: '10%-20%',
    min: 10,
    max: 20,
  },
  {
    name: '20%-30%',
    min: 20,
    max: 30,
  },
  {
    name: '30%-40%',
    min: 30,
    max: 40,
  },
  {
    name: '40%-50%',
    min: 40,
    max: 50,
  },
  {
    name: '50%-60%',
    min: 50,
    max: 60,
  },
  {
    name: '60%-70%',
    min: 60,
    max: 70,
  },
  {
    name: '70%-80%',
    min: 70,
    max: 80,
  },
  {
    name: '80%-90%',
    min: 80,
    max: 90,
  },
  {
    name: '90%-100%',
    min: 90,
    max: 100,
  },
];

const getCurrentUserBucketName = (currentValue: number) => {
  let name;
  buckets.forEach((bucket) => {
    if (
      currentValue > bucket.min &&
      (currentValue < bucket.max || currentValue === bucket.max)
    ) {
      name = bucket.name;
    }
  });
  return name;
};

class StatisticController {
  public async getActivityCompletionRate(req: Request, res: Response) {
    const conn = await connection;

    try {
      const activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['createdBy'],
      });

      if (!activity) {
        res.json({
          statusCode: 404,
          error: 'Activity with given id does not exist',
        });
      }

      const unit = activity.createdBy.unit;

      const unitStudentsCount = await conn.manager.count(UserUnit, {
        where: {
          unit: unit,
        },
      });

      const studentActivityCount = await conn.manager.count(UserActivity, {
        where: {
          activity: activity,
        },
      });

      const data = [
        {
          name: 'Did not participate',
          value: unitStudentsCount - studentActivityCount,
        },
        {
          name: 'Participate',
          value: studentActivityCount,
        },
      ];

      res.json({ statusCode: 200, data });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getActivityCaloriesPercentagesPerUsers(
    req: Request,
    res: Response,
  ) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.userId, {
        relations: ['userUnit', 'role'],
      });

      if (!user) {
        res.json({
          statusCode: 404,
          error: 'User with given id does not exist',
        });
      }

      const activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['createdBy'],
      });

      if (!activity) {
        res.json({
          statusCode: 404,
          error: 'Activity with given id does not exist',
        });
      }

      const unit = activity.createdBy.unit;
      const unitStudentsCount = await conn.manager.count(UserUnit, {
        where: {
          unit: unit,
        },
      });

      const studentActivities = await conn.manager.find(UserActivity, {
        relations: ['student'],
        where: {
          activity: activity,
        },
      });

      const maxCalories = activity.goalCalories;

      let currentUserBucketName;

      if (user.role.id === 2) {
        const currentUserActivity = studentActivities.find(
          (a) => a.student.id === user.userUnit.id,
        );

        const currentUserValue = Math.round(
          (currentUserActivity.calories / maxCalories) * 100,
        );

        const currentUserValueFormatted =
          currentUserValue > 100 ? 100 : currentUserValue;

        currentUserBucketName = getCurrentUserBucketName(
          currentUserValueFormatted,
        );
      }

      let mapCalories: Record<string, number> = {};

      buckets.forEach((bucket) => {
        mapCalories[bucket.name] = 0;
      });

      studentActivities.forEach((student) => {
        buckets.forEach((bucket) => {
          const value = Math.round((student.calories / maxCalories) * 100);
          if (
            value > bucket.min &&
            (value < bucket.max || value === bucket.max)
          ) {
            mapCalories[bucket.name] += 1;
          } else if (value > bucket.max && bucket.max === 100) {
            mapCalories['90%-100%'] += 1;
          }
        });
      });

      mapCalories['0%-10%'] += unitStudentsCount - studentActivities.length;

      const returnValue = Object.entries(mapCalories).map((e) => ({
        name: e[0],
        students: e[1],
      }));

      res.json({
        statusCode: 200,
        data: {
          statistic: returnValue,
          currentUserBucketName,
        },
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getActivityDistancePercentagesByUser(
    req: Request,
    res: Response,
  ) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.userId, {
        relations: ['userUnit', 'role'],
      });

      if (!user) {
        res.json({
          statusCode: 404,
          error: 'User with given id does not exist',
        });
      }

      const activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['createdBy'],
      });

      if (!activity) {
        res.json({
          statusCode: 404,
          error: 'Activity with given id does not exist',
        });
      }

      const unit = activity.createdBy.unit;
      const unitStudentsCount = await conn.manager.count(UserUnit, {
        where: {
          unit: unit,
        },
      });

      const studentActivities = await conn.manager.find(UserActivity, {
        relations: ['student'],
        where: {
          activity: activity,
        },
      });

      const maxDistance = activity.goalDistance;

      let currentUserBucketName;

      if (user.role.id === 2) {
        const currentUserActivity = studentActivities.find(
          (a) => a.student.id === user.userUnit.id,
        );

        const currentUserValue = Math.round(
          (currentUserActivity.distance / maxDistance) * 100,
        );

        const currentUserValueFormatted =
          currentUserValue > 100 ? 100 : currentUserValue;

        currentUserBucketName = getCurrentUserBucketName(
          currentUserValueFormatted,
        );
      }

      let mapDistance: Record<string, number> = {};

      buckets.forEach((bucket) => {
        mapDistance[bucket.name] = 0;
      });

      studentActivities.forEach((student) => {
        buckets.forEach((bucket) => {
          const value = Math.round((student.distance / maxDistance) * 100);

          if (
            value > bucket.min &&
            (value < bucket.max || value === bucket.max)
          ) {
            mapDistance[bucket.name] += 1;
          } else if (value > bucket.max && bucket.max === 100) {
            mapDistance['90%-100%'] += 1;
          }
        });
      });

      mapDistance['0%-10%'] += unitStudentsCount - studentActivities.length;

      const returnValue = Object.entries(mapDistance).map((e) => ({
        name: e[0],
        students: e[1],
      }));

      res.json({
        statusCode: 200,
        data: {
          statistic: returnValue,
          currentUserBucketName,
        },
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getActivityDurationPercentagesByUser(
    req: Request,
    res: Response,
  ) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.userId, {
        relations: ['userUnit', 'role'],
      });

      if (!user) {
        res.json({
          statusCode: 404,
          error: 'User with given id does not exist',
        });
      }

      const activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['createdBy'],
      });

      if (!activity) {
        res.json({
          statusCode: 404,
          error: 'Activity with given id does not exist',
        });
      }

      const unit = activity.createdBy.unit;
      const unitStudentsCount = await conn.manager.count(UserUnit, {
        where: {
          unit: unit,
        },
      });

      const studentActivities = await conn.manager.find(UserActivity, {
        relations: ['student'],
        where: {
          activity: activity,
        },
      });

      const maxDuration = activity.goalDuration;

      let currentUserBucketName;

      if (user.role.id === 2) {
        const currentUserActivity = studentActivities.find(
          (a) => a.student.id === user.userUnit.id,
        );

        const currentUserValue = Math.round(
          (currentUserActivity.duration / maxDuration) * 100,
        );

        const currentUserValueFormatted =
          currentUserValue > 100 ? 100 : currentUserValue;

        currentUserBucketName = getCurrentUserBucketName(
          currentUserValueFormatted,
        );
      }

      let mapDuration: Record<string, number> = {};

      buckets.forEach((bucket) => {
        mapDuration[bucket.name] = 0;
      });

      studentActivities.forEach((student) => {
        buckets.forEach((bucket) => {
          const value = Math.round((student.duration / maxDuration) * 100);

          if (
            value > bucket.min &&
            (value < bucket.max || value === bucket.max)
          ) {
            mapDuration[bucket.name] += 1;
          } else if (value > bucket.max && bucket.max === 100) {
            mapDuration['90%-100%'] += 1;
          }
        });
      });

      mapDuration['0%-10%'] += unitStudentsCount - studentActivities.length;

      const returnValue = Object.entries(mapDuration).map((e) => ({
        name: e[0],
        students: e[1],
      }));

      res.json({
        statusCode: 200,
        data: {
          statistic: returnValue,
          currentUserBucketName,
        },
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getUnitActivityCompletionRateForUser(
    req: Request,
    res: Response,
  ) {
    const conn = await connection;

    const user: User = await conn.manager.findOne(User, req.params.userId);
    const userUnit: UserUnit = await conn.manager.findOne(UserUnit, {
      user: user,
    });

    const activities: Activity[] = await conn.manager.find(Activity, {
      relations: ['createdBy'],
    });

    const unitActivitiesCount = activities
      .filter((activity) => activity.createdBy.unit.id === userUnit.unit.id)
      .map((a) => a.id).length;

    const studentActivitiesCount = await conn.manager.count(UserActivity, {
      relations: ['activity', 'student'],
      where: {
        student: userUnit,
      },
    });

    const percentage = (studentActivitiesCount / unitActivitiesCount) * 100;

    res.json({ statusCode: 200, percentage });
  }

  public async getProfesorActivitiesStatistic(req: Request, res: Response) {
    const conn = await connection;

    const user: User = await conn.manager.findOne(User, req.params.userId, {
      relations: ['role'],
    });

    if (user.role.id !== 3) {
      res.json({ statusCode: 401, message: 'Only profesor can access.' });
    }

    const userUnit: UserUnit = await conn.manager.findOne(UserUnit, {
      user: user,
    });

    // Activities created by some user
    const activities: Activity[] = await conn.manager.find(Activity, {
      relations: ['createdBy', 'userActivities'],
      where: {
        createdBy: userUnit,
      },
    });

    //Count students on that university
    const users: User[] = await conn.manager.find(User, {
      relations: ['userUnit', 'role'],
      where: {
        role: {
          id: 2,
        },
      },
    });

    const filteredUsersIds = users
      .filter((user) => user.userUnit.unit.id === userUnit.unit.id)
      .map((user) => user.id);

    const popular = {};
    activities.forEach((activity) => {
      const percentage = Math.floor(
        (activity.userActivities.length / filteredUsersIds.length) * 100,
      );
      popular[activity.id] = {
        name: activity.name,
        type: activity.type,
        percentage: percentage,
      };
    });

    const completed = {};
    activities.forEach((activity) => {
      let counter = 0;
      activity.userActivities.forEach((userActivity) => {
        if (
          userActivity.distance > activity.goalDistance &&
          userActivity.duration > activity.goalDuration &&
          userActivity.calories > activity.goalCalories
        ) {
          counter++;
        }
      });
      const percentage = Math.floor((counter / filteredUsersIds.length) * 100);
      completed[activity.id] = {
        name: activity.name,
        type: activity.type,
        percentage: percentage,
      };
    });

    res.json({
      statusCode: 200,
      data: { popularity: popular, completionRate: completed },
    });
  }
}

export = new StatisticController();
