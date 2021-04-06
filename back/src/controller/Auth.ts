import { Request, Response } from 'express';
import AuthService from '../service/auth.service';

class AuthController {
	private authService = AuthService;

	constructor() {
		this.login = this.login.bind(this);
	}

	public async login(req: Request, res: Response) {
		const loginData = {
			email: req.body.email,
			password: req.body.password,
		};

		const { user, isValid } = await this.authService.validateUser(loginData);

		if (!isValid) {
			res.json({ statusCode: 404, message: 'Incorrect email or password' });
		} else {
			const token = this.authService.createToken(user.id);
			res.json({
				statusCode: 200,
				message: 'Successfully logged in!',
				token,
				user,
			});
		}
	}
}

export = new AuthController();
