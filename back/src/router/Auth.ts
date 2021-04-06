import { Router } from 'express';
import AuthController from '../controller/Auth';

class AuthRouter {
	private _router = Router();
	private controller = AuthController;

	get router() {
		return this._router;
	}

	constructor() {
		this.configure();
	}

	private configure() {
		this._router.post('/login', this.controller.login);
	}
}

export = new AuthRouter().router;
