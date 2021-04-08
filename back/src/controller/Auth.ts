import { Request, Response } from 'express';
import AuthService from '../service/auth.service';
import UserService from '../service/user.service';

class AuthController {
	private authService = AuthService;
	private userService = UserService;

	constructor() {
		this.login = this.login.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	public async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const { user, isValid } = await this.authService.validateUser({
			email,
			password,
		});

		if (!isValid) {
			res.json({ statusCode: 400, message: 'Incorrect email or password' });
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

	public async signUp(req: Request, res: Response) {
		const { failed, message, user } = await this.userService.createUser(
			req.body,
		);

		if (failed) {
			return res.json({ statusCode: 400, message });
		}

		const token = this.authService.createToken(user.id);

		res.json({
			statusCode: 200,
			message,
			token,
			user,
		});
	}
}

export = new AuthController();
