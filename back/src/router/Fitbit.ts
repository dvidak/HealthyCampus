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
    this._router.get('/:id', this.controller.getBasic);
  }
}

export = new FitbitRouter().router;
