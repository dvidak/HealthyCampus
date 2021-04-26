import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { University } from '../entity/University';

class UniversityController {
  public async getAllUniversities(_: Request, res: Response) {
    const conn = await connection;

    try {
      const universities: University[] = await conn.manager.find(University);
      res.json({ statusCode: 200, universities });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async createUniversity(req: Request, res: Response) {
    const conn = await connection;

    try {
      const university = new University();
      university.name = req.body.name;
      await conn.manager.save(university);
      res.json({ statusCode: 201, message: 'Successfully created.' });
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async updateUniversity(req: Request, res: Response) {
    const conn = await connection;

    try {
      let university = await conn.manager.findOne(University, req.params.id);

      if (university) {
        university.name = req.body.name;
        await conn.manager.save(university);
        res.json({
          statusCode: 204,
          message: 'Successfully updated.',
        });
      } else {
        res.json({
          statusCode: 404,
          message: 'University with given id does not exist.',
        });
      }
    } catch (error) {
      res.json({ status: 400, error });
    }
  }

  public async getUniversityById(req: Request, res: Response) {
    const conn = await connection;

    try {
      let university = await conn.manager.findOne(University, req.params.id);

      if (university) {
        res.json({ statusCode: 200, university });
      } else {
        res.json({
          statusCode: 404,
          message: 'University with given id does not exist.',
        });
      }
    } catch (error) {
      res.json({ statusCode: 400, error });
    }
  }

  public async deleteUniversity(req: Request, res: Response) {
    const conn = await connection;

    try {
      const university = await conn.manager.findOne(University, req.params.id);

      if (university) {
        await conn.manager.remove(University, university);
        res.json({ statusCode: 204, message: 'Successfully removed.' });
      } else {
        res.json({
          statusCode: 404,
          message: 'University with given id does not exist.',
        });
      }
    } catch (error) {
      res.json({
        statusCode: 400,
        message: 'You are not allowed to delete university with units',
      });
    }
  }
}

export = new UniversityController();
