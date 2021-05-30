import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { UserActivity } from '../entity/UserActivity';
import { UserUnit } from '../entity/UserUnit';

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
          name: 'Other',
          value: unitStudentsCount - studentActivityCount,
        },
        {
          name: 'Connected users',
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
        where: {
          activity: activity,
        },
      });

      const maxCalories = activity.goalCalories;

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

      res.json({ statusCode: 200, data: returnValue });
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
        where: {
          activity: activity,
        },
      });

      const maxDistance = activity.goalDistance;

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

      res.json({ statusCode: 200, data: returnValue });
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
        where: {
          activity: activity,
        },
      });

      const maxDuration = activity.goalDuration;

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

      res.json({ statusCode: 200, data: returnValue });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new StatisticController();
