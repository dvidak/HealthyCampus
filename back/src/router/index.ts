import { UniversityController } from '../controller/University';
import { UserController } from '../controller/User.controller';

class Router {
	private userController: UserController;
	private universityController: UniversityController;
	constructor() {
		this.userController = new UserController();
		this.universityController = new UniversityController();
	}

	public routes(app): void {
		app.route('/user').get(this.userController.getAllUsers);

		app
			.route('/university')
			.get(this.universityController.getAllUniversities)
			.post(this.universityController.createUniversity);
		app
			.route('/university/:universityId')
			.get(this.universityController.getUniversityById)
			.put(this.universityController.updateUniversity)
			.delete(this.universityController.deleteUniversity);

	}
}

export default Router;
