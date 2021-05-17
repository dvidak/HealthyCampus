import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { UserActivity } from '../entity/UserActivity';
import { UserUnit } from '../entity/UserUnit';

class UserActivityController {
  public async createUserActivity(req: Request, res: Response) {
    const conn = await connection;

    try {
      let userActivity = new UserActivity();
      userActivity.distance = req.body.distance;
      userActivity.duration = req.body.duration;
      userActivity.calories = req.body.calories;
      userActivity.elevation = req.body.elevation;
      userActivity.manual = req.body;

      const activity = await conn.manager.findOne(
        Activity,
        req.body.activityId,
      );

      if (!activity) {
      }

      userActivity.activity = activity;

      const userUnit = await conn.manager.findOne(UserUnit, {
        user: {
          id: req.body.userId,
        },
      });

      userActivity.student = userUnit;

      await conn.manager.save(userActivity);

      res.json({ statusCode: 201, message: 'Successfully created.' });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new UserActivityController();
