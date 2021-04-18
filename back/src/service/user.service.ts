import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { connection } from '../connection/Connection';
import { User } from '../entity/User';
import { Unit } from '../entity/Unit';
import { Role } from '../entity/Role';
import { UserUnit } from '../entity/UserUnit';

interface SignUpData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	unitId: number;
}

class UserService {
	public async userAlreadyExists(email: string) {
		const conn = await connection;

		const userAlreadyExists = await conn.manager.findOne(User, {
			email: email,
		});

		return Boolean(userAlreadyExists);
	}

	public async createUser(signUpData: SignUpData) {
		const conn = await connection;
		const { firstName, lastName, email, password, unitId } = signUpData;

		const userAlreadyExists = await this.userAlreadyExists(email);

		if (userAlreadyExists) {
			return {
				failed: true,
				message: 'Email aready taken',
			};
		}

		if (!unitId) {
			return {
				failed: true,
				message: 'Unit id is required.',
			};
		}

		const unit = await conn.manager.findOne(Unit, unitId);

		if (!unit) {
			return {
				failed: true,
				message:
					'Unit with given id does not exist. User must belong to some unit.',
			};
		}

		// Create new user
		const newUser = new User();
		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.email = email;

		// TODO: change
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
			//todo add to reg data
			userUnit.academicYear = 'some year';
			await conn.manager.save(userUnit);

			newUser.userUnit = userUnit;
			await conn.manager.save(newUser);

			return {
				failed: false,
				message: 'User and userUnit created.',
				user,
			};
		} catch {
			await conn.manager.remove(User, user);
			return {
				failed: true,
				message: 'Failed user unit.',
			};
		}
	}
}

export = new UserService();
