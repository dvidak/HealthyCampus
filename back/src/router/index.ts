import { ActivityTypeController } from '../controller/ActivityType';
import { UnitController } from '../controller/Unit';
import { UniversityController } from '../controller/University';
import { UserController } from '../controller/User.controller';

class Router {
	private activityTypeController: ActivityTypeController;
	private userController: UserController;
	private unitController: UnitController;
	private universityController: UniversityController;

	constructor() {
		this.activityTypeController = new ActivityTypeController();
		this.userController = new UserController();
		this.universityController = new UniversityController();
		this.unitController = new UnitController();
	}

	public routes(app): void {
		app.route('/user').get(this.userController.getAllUsers);

		app
			.route('/activity-type')
			.get(this.activityTypeController.getAllActivityTypes)
			.post(this.activityTypeController.createActivityType);

		app
			.route('/activity-type/:id')
			.get(this.activityTypeController.getActivityTypeById)
			.put(this.activityTypeController.updateActivityType)
			.delete(this.activityTypeController.deleteActivityType);

		app
			.route('/university')
			.get(this.universityController.getAllUniversities)
			.post(this.universityController.createUniversity);
		app
			.route('/university/:id')
			.get(this.universityController.getUniversityById)
			.put(this.universityController.updateUniversity)
			.delete(this.universityController.deleteUniversity);

		app
			.route('/unit')
			.get(this.unitController.getAllUnits)
			.post(this.unitController.createUnit);

		app
			.route('/unit/:id')
			.get(this.unitController.getUnitById)
			.put(this.unitController.updateUnit)
			.delete(this.unitController.deleteUnit);
	}
}

export default Router;
