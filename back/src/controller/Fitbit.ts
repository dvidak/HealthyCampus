import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { User } from '../entity/User';
import fitbitActivityService from '../service/fitbit-activity.service';

class FitbitController {
  public async getPeriodicResourceData(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.id, {
        relations: ['fitbit'],
      });

      const resourceData =
        await fitbitActivityService.getPeriodicDataBasedOnDates(
          user,
          req.params.resource,
          req.params.baseDate,
          req.params.endDate,
        );

      const resourceDataMapped = resourceData.map((e) => ({
        dateTime: e.dateTime,
        [req.params.resource]: Number(e.value),
      }));

      res.json({
        statusCode: 200,
        data: resourceDataMapped,
      });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new FitbitController();
