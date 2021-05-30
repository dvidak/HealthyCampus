import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { User } from '../entity/User';
import fitbitActivityService from '../service/fitbit-activity.service';

class FitbitController {
  public async getBasic(req: Request, res: Response) {
    const conn = await connection;

    try {
      console.log('try');
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const caloriesData = await fitbitActivityService.getPeriodicData(
        user,
        'activityCalories',
      );

      const stepsData = await fitbitActivityService.getPeriodicData(
        user,
        'steps',
      );

      const minutesLightlyActiveData =
        await fitbitActivityService.getPeriodicData(
          user,
          'minutesLightlyActive',
        );

      const minutesFairlyActiveData =
        await fitbitActivityService.getPeriodicData(
          user,
          'minutesFairlyActive',
        );

      res.json({
        statusCode: 200,
        caloriesData,
        stepsData,
        minutesLightlyActiveData,
        minutesFairlyActiveData,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new FitbitController();
