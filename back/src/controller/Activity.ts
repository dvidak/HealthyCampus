import { Request, Response } from 'express';
import { runInNewContext } from 'vm';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { ActivityType } from '../entity/ActivityType';
import { User } from '../entity/User';
import { UserActivity } from '../entity/UserActivity';
import { UserUnit } from '../entity/UserUnit';

class ActivityController {
  // For admin
  public async getAllActivities(_: Request, res: Response) {
    const conn = await connection;

    try {
      const activities: Activity[] = await conn.manager.find(Activity);
      res.status(200).json(activities);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async getActivityById(req: Request, res: Response) {
    const conn = await connection;

    try {
      let activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['userActivities', 'type', 'userActivities.student'],
      });
      res.status(200).json(activity);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  // For prof
  public async getAllActivitiesForProf(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user: User = await conn.manager.findOne(User, req.params.userId);
      const userUnit: UserUnit = await conn.manager.findOne(UserUnit, {
        user: user,
      });

      const activities: Activity[] = await conn.manager.find(Activity, {
        where: {
          createdBy: userUnit,
        },
      });

      res.status(200).json(activities);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  // For student
  public async getAllActivitiesForSpecificUser(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user: User = await conn.manager.findOne(User, req.params.userId);
      const userUnit: UserUnit = await conn.manager.findOne(UserUnit, {
        relations: ['unit'],
        where: {
          user: user,
        },
      });

      const activities: Activity[] = await conn.manager.find(Activity, {
        relations: ['createdBy', 'createdBy.user'],
        where: {
          createdBy: {
            unit: userUnit.unit,
          },
        },
      });

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

      if (!req.body.userId) {
        res.json({
          statusCode: 400,
          message: 'Failed. UserId is required.',
        });
      }

      const user = await conn.manager.findOne(User, req.body.userId, {
        relations: ['role'],
      });

      if (!user) {
        res.json({
          statusCode: 400,
          message: 'Failed. User with given id does not exist.',
        });
      }

      if (user.role.roleName !== 'Profesor') {
        res.json({
          statusCode: 400,
          message: 'Failed. Invalid user role',
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

  public async updateActivity(req: Request, res: Response) {
    const conn = await connection;

    try {
      let activity = await conn.manager.findOne(Activity, req.params.id);

      if (activity) {
        activity.name = req.body.name;
        activity.description = req.body.description;
        activity.goalDuration = req.body.goalDuration;
        activity.goalDistance = req.body.goalDistance;
        activity.goalCalories = req.body.goalCalories;
        activity.goalElevation = req.body.goalElevation;

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

        // Has to be of type bigint in database
        activity.startDate = Date.parse(req.body.startDate);
        activity.endDate = Date.parse(req.body.endDate);

        await conn.manager.save(activity);
        res.json({
          statusCode: 204,
          message: 'Successfully updated.',
        });
      } else {
        res.json({
          statusCode: 404,
          message: 'Activity with given id does not exist.',
        });
      }
    } catch (error) {
      res.json({ status: 400, error });
    }
  }
}

export = new ActivityController();
