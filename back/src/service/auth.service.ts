import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { connection } from '../connection/Connection';
import { User } from '../entity/User';

interface LoginData {
	email: string;
	password: string;
}

class AuthService {
	public async validateUser(loginData: LoginData) {
		const conn = await connection;

		const user = await conn.manager.findOne(User, {
			email: loginData.email,
		});

		if (!user) {
			return { user, isValid: false };
		}

		const hasValidPassword = await bcrypt.compare(
			loginData.password,
			user.password,
		);

		if (!hasValidPassword) {
			return { user, isValid: false };
		}

		return { user, isValid: true };
	}

	public createToken(userId: number) {
		return jwt.sign(
			{
				iss: 'App',
				sub: userId,
				iat: new Date().getTime(),
				exp: new Date().setDate(new Date().getDate() + 1),
			},
			'secretcode',
		);
	}

	public verifyToken(token: string) {
		return jwt.verify(token, 'secretcode');
	}
}

export = new AuthService();
