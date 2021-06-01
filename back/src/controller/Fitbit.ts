import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { User } from '../entity/User';
import fitbitActivityService from '../service/fitbit-activity.service';

class FitbitController {
  public async getPeriodicCaloriesData(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const caloriesData = await fitbitActivityService.getPeriodicData(
        user,
        'activityCalories',
      );

      res.json({
        statusCode: 200,
        data: caloriesData,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getPeriodicStepsData(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const stepsData = await fitbitActivityService.getPeriodicData(
        user,
        'steps',
      );

      res.json({
        statusCode: 200,
        data: stepsData,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getPeriodicMinutesFairlyActiveData(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const minutesFairlyActiveData =
        await fitbitActivityService.getPeriodicData(
          user,
          'minutesFairlyActive',
        );

      res.json({
        statusCode: 200,
        data: minutesFairlyActiveData,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getPeriodicminutesLightlyActiveData(
    req: Request,
    res: Response,
  ) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const minutesLightlyActiveData =
        await fitbitActivityService.getPeriodicData(
          user,
          'minutesLightlyActive',
        );

      res.json({
        statusCode: 200,
        data: minutesLightlyActiveData,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new FitbitController();
