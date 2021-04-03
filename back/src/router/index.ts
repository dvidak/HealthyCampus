import { Router } from 'express';
import UnitRouter from './Unit';
import UniveristyRouter from './University';
import ActivityTypeRouter from './ActivityType';

class AppRouter {
	private _router = Router();
	private unitRouter = UnitRouter;
	private univerityRouter = UniveristyRouter;
	private activityTypeRouter = ActivityTypeRouter;

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
	}
}

export = new AppRouter().router;
