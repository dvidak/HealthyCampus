import { Request, Response } from 'express';
import { getDatesBetweenDates } from '../common';
import { connection } from '../connection/Connection';
import { Activity } from '../entity/Activity';
import { ActivityType } from '../entity/ActivityType';
import { User } from '../entity/User';
import { UserUnit } from '../entity/UserUnit';
import fitbitActivityService from '../service/fitbit-activity.service';

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2),
    month = datePart[1],
    day = datePart[2];

  return day + '.' + month + '.' + year + '.';
};

interface FitbitActivity {
  activityId: number;
  calories: number;
  distance: number;
  duration: number;
  steps: number;
  description: string;
  name: string;
  startDate: string;
  startTime: string;
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

      const dateStrings = getDatesBetweenDates(
        new Date(parseInt(req.params.startDate)),
        new Date(parseInt(req.params.endDate)),
      );

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
        const totalDistance = element.summary.distances.find(
          (a) => a.activity === 'total',
        );

        element.activities.forEach((activity) => {
          const m: FitbitActivity = {
            activityId: activity.activityId,
            calories: activity.calories,
            distance: activity.distance || totalDistance.distance || 0,
            steps: activity.steps,
            description: activity.description,
            duration: Math.round(activity.duration / 60000),
            name: activity.name,
            startDate: formatDate(activity.startDate),
            startTime: activity.startTime,
          };
          onlyActivities.push(m);
        });

        if (element.summary.activityCalories > 0) {
          const customDescription = element.summary.heartRateZones
            ? element.summary.heartRateZones.map((a) => a.name).join(', ')
            : '';

          const m: FitbitActivity = {
            activityId: 0,
            calories: element.summary.activityCalories,
            distance: totalDistance.distance || 0,
            steps: element.summary.steps || 0,
            description: customDescription,
            duration: 0,
            name: customDescription,
            startDate: '',
            startTime: '',
          };
          onlyActivities.push(m);
        }
      });

      res.status(200).json(onlyActivities as any[]);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  // Just example
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
      const user: User = await conn.manager.findOne(User, req.params.id, {
        relations: ['userUnit'],
      });

      const unit = user.userUnit.unit;

      const allActivities: Activity[] = await conn.manager.find(Activity, {
        relations: [
          'createdBy',
          'createdBy.user',
          'userActivities',
          'userActivities.student',
        ],
      });

      const noData = allActivities.filter((a) => {
        const isNotFinished = a.userActivities.find(
          (a) => a.student.id === user.userUnit.id,
        );

        return a.createdBy.unit.id === unit.id && !isNotFinished;
      });

      const hasData = allActivities.filter((a) => {
        const isNotFinished = a.userActivities.find(
          (a) => a.student.id === user.userUnit.id,
        );

        return a.createdBy.unit.id === unit.id && isNotFinished;
      });

      res.status(200).json({
        connected: hasData,
        other: noData,
      });
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

  public async deleteActivity(req: Request, res: Response) {
    const conn = await connection;

    try {
      const activity = await conn.manager.findOne(Activity, req.params.id, {
        relations: ['userActivities'],
      });

      if (!activity) {
        res.json({
          statusCode: 404,
          message: 'Activity with given id does not exist.',
        });
      }
      if (activity.userActivities.length > 0) {
        res.json({
          statusCode: 400,
          message:
            'You are not allowed to delete activity that has connected user activities!',
        });
      }

      await conn.manager.remove(Activity, activity);
      res.json({ statusCode: 204, message: 'Successfully removed.' });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export = new ActivityController();
