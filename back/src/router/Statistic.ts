import { Router } from 'express';
import StatisticController from '../controller/Statistic';

class StatisticRouter {
  private _router = Router();
  private controller = StatisticController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get(
      '/activity/:id',
      this.controller.getActivityCompletionRate,
    );
  }
}

export = new StatisticRouter().router;
