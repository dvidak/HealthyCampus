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
      '/:userId',
      this.controller.getAllActivitiesForSpecificUser,
    );
  }
}

export = new ActivityRouter().router;
