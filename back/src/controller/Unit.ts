import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Unit } from '../entity/Unit';
import { University } from '../entity/University';
import { UserUnit } from '../entity/UserUnit';

class UnitController {
  public async getAllUnits(_: Request, res: Response) {
    const conn = await connection;

    try {
      const units: Unit[] = await conn.manager.find(Unit);
      res.status(200).json(units);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async createUnit(req: Request, res: Response) {
    const conn = await connection;

    try {
      const university = await conn.manager.findOne(
        University,
        req.body.universityId,
      );

      if (university) {
        let unit = new Unit();
        unit.name = req.body.name;
        unit.university = university;
        await conn.manager.save(unit);
        res.status(201).json({ message: 'Successfully created.' });
      } else {
        res.status(400).json({
          error:
            'Unit must belong to some university. University with given id does not exist',
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async updateUnit(req: Request, res: Response) {
    const conn = await connection;

    try {
      let university: University;
      university = await conn.manager.findOne(
        University,
        req.body.universityId,
      );
      let oldUnit: Unit = await conn.manager.findOne(Unit, req.params.id, {
        relations: ['university'],
      });

      if (oldUnit) {
        oldUnit.name = req.body.name;
        oldUnit.university = university;
        await conn.manager.save(oldUnit);

        res.json({
          statusCode: 200,
        });
      } else {
        res.json({
          statusCode: 404,
          message: 'Unit with given id does not exist',
        });
      }
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async getUnitById(req: Request, res: Response) {
    const conn = await connection;

    try {
      let unit = await conn.manager.findOne(Unit, req.params.id);

      if (unit) {
        res.status(200).json(unit);
      } else {
        res.status(404).json({ message: 'Unit with given id does not exist.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async deleteUnit(req: Request, res: Response) {
    const conn = await connection;

    try {
      const unit = await conn.manager.findOne(Unit, req.params.id);
      const userUnit = await conn.manager.find(UserUnit, {
        unit: unit,
      });

      if (userUnit.length > 0) {
        res.json({
          statusCode: 400,
          message:
            'You are not allowed to delete a unit if there are students connected to it.',
        });
      } else if (unit) {
        await conn.manager.remove(Unit, unit);
        res.json({ statusCode: 204, message: 'Successfully removed.' });
      } else {
        res.json({
          statusCode: 400,
          message: 'Unit with given id does not exist.',
        });
      }
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }
}

export = new UnitController();
