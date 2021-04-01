import UserController from '../controller/User.controller';

class Router {
	private userController: UserController;
	constructor() {
		this.userController = new UserController();
	}

	public routes(app): void {
		app.route('/user').get(this.userController.getAllUsers);
	}
}

export default Router;
