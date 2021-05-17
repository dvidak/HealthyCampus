import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { User } from '../entity/User';
import { UserActivity } from '../entity/UserActivity';
import { UserUnit } from '../entity/UserUnit';

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

      res.json({ statusCode: 200, unitStudentsCount, studentActivityCount });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new StatisticController();
