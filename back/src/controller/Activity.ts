import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { ActivityType } from '../entity/ActivityType';
import { User } from '../entity/User';
import { UserUnit } from '../entity/UserUnit';
import fitbitActivityService from '../service/fitbit-activity.service';

interface FitbitActivity {
  activityId: number;
  calories: number;
  description: string;
  duration: number;
  name: string;
  startDate: string;
  startTime: string;
  logId: number;
}

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

  public async getPossibleFitbitAcctivities(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });
      const dateStrings = [
        '2021-04-24',
        '2021-04-25',
        '2021-04-26',
        '2021-04-27',
      ];

      let fitBitReponses = [];

      for (const date of dateStrings) {
        const data = await fitbitActivityService.getActivities(
          user,
          `activities/date/${date}.json`,
        );
        fitBitReponses.push(data);
      }

      let onlyActivities = [];

      fitBitReponses.forEach((element) => {
        element.activities.forEach((activity) => {
          const m: FitbitActivity = {
            activityId: activity.activityId,
            calories: activity.calories,
            description: activity.description,
            duration: activity.durtion,
            name: activity.name,
            startDate: activity.startDate,
            startTime: activity.startTime,
            logId: activity.logId,
          };
          onlyActivities.push(m);
        });
      });

      res.status(200).json(onlyActivities as FitbitActivity[]);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async getLastMonthFitbitAcctivities(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const data = await fitbitActivityService.getActivities(
        user,
        'activities/activityCalories/date/today/1m.json',
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async getActivityById(req: Request, res: Response) {
    const conn = await connection;

    try {
      let activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['userActivities', 'userActivities.student'],
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
