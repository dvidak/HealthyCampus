import { Router } from 'express';
import UserController from '../controller/User';

class UserRouter {
	private _router = Router();
	private controller = UserController;

	get router() {
		return this._router;
	}

	constructor() {
		this.configure();
	}

	private configure() {
		this._router.get('', this.controller.getAllUsers);
		this._router.post('', this.controller.createUser);

		this._router.get('/:id', this.controller.getUserById);
		this._router.put('/:id', this.controller.updateUser);
		this._router.delete('/:id', this.controller.deleteUser);
	}
}

export = new UserRouter().router;
