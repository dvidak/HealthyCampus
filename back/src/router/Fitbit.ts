import { Router } from 'express';
import FitbitController from '../controller/Fitbit';

class FitbitRouter {
  private _router = Router();
  private controller = FitbitController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('/calories/:id', this.controller.getPeriodicCaloriesData);
    this._router.get('/steps/:id', this.controller.getPeriodicStepsData);
    this._router.get(
      '/minutes-lightly-active/:id',
      this.controller.getPeriodicminutesLightlyActiveData,
    );
    this._router.get(
      '/minutes-fairly-active/:id',
      this.controller.getPeriodicMinutesFairlyActiveData,
    );
  }
}

export = new FitbitRouter().router;
