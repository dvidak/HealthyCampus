import { Router } from 'express';
import ActivityTypeController from '../controller/ActivityType';

class ActivityTypeRouter {
  private _router = Router();
  private controller = ActivityTypeController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('/load', this.controller.load);
    this._router.get('', this.controller.getAllActivityTypes);
    this._router.post('', this.controller.createActivityType);

    this._router.get('/:id', this.controller.getActivityTypeById);
    this._router.put('/:id', this.controller.updateActivityType);
    this._router.delete('/:id', this.controller.deleteActivityType);
  }
}

export = new ActivityTypeRouter().router;
