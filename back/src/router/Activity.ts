import { Router } from 'express';
import ActivityController from '../controller/Activity';

class ActivityRouter {
  private _router = Router();
  private controller = ActivityController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('', this.controller.getAllActivities);
    this._router.post('', this.controller.createActivity);
    this._router.get('/:id', this.controller.getActivityById);
    this._router.put('/:id', this.controller.updateActivity);
    this.router.get('/prof/:userId', this.controller.getAllActivitiesForProf);
    this._router.get(
      '/student/:id',
      this.controller.getAllActivitiesForSpecificUser,
    );

    // Fitbit
    this._router.get(
      '/fitbit/:id',
      this.controller.getPossibleFitbitAcctivities,
    );

    this._router.get(
      '/fitbit/lastMonth/:id',
      this.controller.getLastMonthFitbitAcctivities,
    );
  }
}

export = new ActivityRouter().router;
