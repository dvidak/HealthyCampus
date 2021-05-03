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
  }
}

export = new ActivityRouter().router;
