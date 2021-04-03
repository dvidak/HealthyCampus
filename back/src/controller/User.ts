import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Role } from '../entity/Role';
import { Unit } from '../entity/Unit';
import { User } from '../entity/User';
import { UserUnit } from '../entity/UserUnit';

class UserController {
	public async createUser(req: Request, res: Response) {
		const conn = await connection;
		const { firstName, lastName, email, password, unitId } = req.body;

		// Check if there is a user with the same email
		const userAlreadyExists = await conn.manager.findOne(User, {
			email: email,
		});

		if (userAlreadyExists) {
			return res.status(409).json({ message: 'Email aready taken.' });
		}

		if (!unitId) {
			return res.status(400).json({ message: 'Unit id is required.' });
		}

		const unit = await conn.manager.findOne(Unit, unitId);

		if (!unit) {
			return res.status(400).json({
				message:
					'Unit with given id does not exist. User must belong to some unit',
			});
		}

		// Create new user
		const newUser = new User();
		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.email = email;

		const studentRole = await conn.manager.findOne(Role, {
			roleName: 'STUDENT',
		});
		newUser.role = studentRole;

		// Password
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		newUser.password = passwordHash;

		const user = await conn.manager.save(newUser);
		delete user.password;

		try {
			const userUnit = new UserUnit();
			userUnit.user = user;
			userUnit.unit = unit;
			userUnit.academicYear = 'some year';
			await conn.manager.save(userUnit);

			return res
				.status(201)
				.json({ message: 'User and userUnit created.', user });
		} catch {
			await conn.manager.remove(User, user);
			return res.status(400).json({ message: 'Failed user unit.' });
		}
	}

	public getAllUsers(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const users: User[] = await connection.manager.find(User, {
					relations: ['userUnit'],
				});
				res.status(200).json(users);
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public getUserById(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let user = await connection.manager.findOne(User, req.params.id, {
					relations: ['userUnit'],
				});

				if (user) {
					delete user.password;
					res.status(200).json(user);
				} else {
					res
						.status(404)
						.json({ message: 'User with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public updateUser(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let oldUser = await connection.manager.findOne(User, req.params.id);

				if (oldUser) {
					oldUser.firstName = req.body.firstName;
					oldUser.lastName = req.body.lastName;
					oldUser.email = req.body.email;
					oldUser.role = req.body.role;

					// Edit password
					const salt = await bcrypt.genSalt(10);
					const passwordHash = await bcrypt.hash(req.body.password, salt);
					oldUser.password = passwordHash;

					await connection.manager.save(oldUser);
					res.status(204).json({ message: 'Successfully updated.' });
				} else {
					res
						.status(404)
						.json({ message: 'User with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	// TODO: Delete fitbit account?
	public deleteUser(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const user = await connection.manager.findOne(User, req.params.userId);
				const userUnit = await connection.manager.findOne(UserUnit, {
					user: user,
				});

				if (user) {
					await connection.manager.remove(UserUnit, userUnit);
					await connection.manager.remove(User, user);
					res.status(204).json();
				} else {
					res
						.status(404)
						.json({ message: 'User with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}
}

export = new UserController();
