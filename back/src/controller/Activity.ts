import { Request, Response } from 'express';
import { runInNewContext } from 'vm';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { ActivityType } from '../entity/ActivityType';
import { User } from '../entity/User';
import { UserUnit } from '../entity/UserUnit';

class ActivityController {
  public async getAllActivities(_: Request, res: Response) {
    const conn = await connection;

    try {
      const activities: Activity[] = await conn.manager.find(Activity);
      res.status(200).json(activities);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async createActivity(req: Request, res: Response) {
    const conn = await connection;

    try {
      const activity = new Activity();

      activity.name = req.body.name;
      activity.description = req.body.description;
      activity.goalDuration = req.body.goalDuration;
      activity.goalDistance = req.body.goalDistance;
      activity.goalCalories = req.body.goalCalories;
      activity.goalElevation = req.body.goalElevation;

      if (!req.body.activityTypeId) {
        res.json({
          statusCode: 400,
          message: 'Failed. ActivityId is required.',
        });
      }

      const activityType = await conn.manager.findOne(
        ActivityType,
        req.body.activityTypeId,
      );

      if (!activityType) {
        res.json({
          statusCode: 400,
          message: 'Failed. ActivityId is invalid.',
        });
      }

      activity.type = activityType;

      if (req.body.userId) {
        res.json({
          statusCode: 400,
          message: 'Failed. UserId is required.',
        });
      }

      const user = await conn.manager.findOne(User, req.body.userId);

      if (!user) {
        res.json({
          statusCode: 400,
          message: 'Failed. User with given id does not exist.',
        });
      }

      const userUnit = await conn.manager.findOne(UserUnit, { user: user });

      if (!userUnit) {
        res.json({
          statusCode: 400,
          message: 'Failed. UserUnit does not exist for given user.',
        });
      }

      activity.createdBy = userUnit;

      // Has to be of type bigint in database
      activity.startDate = Date.parse(req.body.startDate);
      activity.endDate = Date.parse(req.body.endDate);

      await conn.manager.save(activity);
      res.status(201).json({ message: 'Successfully created.' });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export = new ActivityController();
