import { Router } from 'express';
import UserActivityController from '../controller/UserActivity';

class UserActivityRouter {
  private _router = Router();
  private controller = UserActivityController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.post('', this.controller.createUserActivity);
  }
}

export = new UserActivityRouter().router;
