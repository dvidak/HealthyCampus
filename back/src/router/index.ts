import { Router } from 'express';
import UnitRouter from './Unit';
import UniveristyRouter from './University';
import ActivityTypeRouter from './ActivityType';
import UserRouter from './User';

class AppRouter {
	private _router = Router();
	private activityTypeRouter = ActivityTypeRouter;
	private unitRouter = UnitRouter;
	private univerityRouter = UniveristyRouter;
	private userRouter = UserRouter;

	constructor() {
		this.configure();
	}

	get router() {
		return this._router;
	}

	private configure() {
		this._router.use('/activity-type', this.activityTypeRouter);
		this._router.use('/unit', this.unitRouter);
		this._router.use('/university', this.univerityRouter);
		this._router.use('/user', this.userRouter);
	}
}

export = new AppRouter().router;
