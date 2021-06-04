import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Not } from 'typeorm';
import { connection } from '../connection/Connection';
import { Unit } from '../entity/Unit';
import { User } from '../entity/User';
import { UserUnit } from '../entity/UserUnit';

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    const conn = await connection;

    try {
      const users: User[] = await conn.manager.find(User, {
        relations: ['userUnit', 'role', 'fitbit'],
        where: {
          role: {
            id: Not(1),
          },
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async getUserById(req: Request, res: Response) {
    const conn = await connection;

    try {
      let user = await conn.manager.findOne(User, req.params.id, {
        relations: ['userUnit', 'role', 'fitbit'],
      });

      if (user) {
        delete user.password;
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User with given id does not exist.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const conn = await connection;

    try {
      let oldUser = await conn.manager.findOne(User, req.params.id);

      if (oldUser) {
        oldUser.firstName = req.body.firstName;
        oldUser.lastName = req.body.lastName;
        oldUser.email = req.body.email;

        const unitId = Number(req.body.unitId);
        const newUserUnit = await conn.manager.findOne(Unit, unitId);
        const userUnit = await conn.manager.findOne(UserUnit, {
          user: oldUser,
        });

        userUnit.unit = newUserUnit;
        await conn.manager.save(userUnit);

        // Edit password
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(req.body.password, salt);
          oldUser.password = passwordHash;
        }

        await conn.manager.save(oldUser);
        res.status(204).json({ message: 'Successfully updated.' });
      } else {
        res.status(404).json({ message: 'User with given id does not exist.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  public async updateUserImage(req: Request, res: Response) {
    const conn = await connection;

    try {
      let oldUser = await conn.manager.findOne(User, req.params.id);

      if (oldUser) {
        oldUser.avatar = req.body.url;
        await conn.manager.save(oldUser);
      }
      res.json({ statusCode: 204, message: 'Successfully updated.' });
    } catch (error) {
      res.json({ statusCode: 400, message: 'Image to large' });
    }
  }

  // TODO: Delete fitbit account?
  public async deleteUser(req: Request, res: Response) {
    const conn = await connection;

    try {
      const user = await conn.manager.findOne(User, req.params.userId);
      const userUnit = await conn.manager.findOne(UserUnit, {
        user: user,
      });

      if (user) {
        await conn.manager.remove(UserUnit, userUnit);
        await conn.manager.remove(User, user);
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'User with given id does not exist.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export = new UserController();
