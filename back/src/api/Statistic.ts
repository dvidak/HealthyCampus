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

    this._router.get(
      '/activity/:id/calories/:userId',
      this.controller.getActivityCaloriesPercentagesPerUsers,
    );

    this._router.get(
      '/activity/:id/distance/:userId',
      this.controller.getActivityDistancePercentagesByUser,
    );

    this._router.get(
      '/activity/:id/duration/:userId',
      this.controller.getActivityDurationPercentagesByUser,
    );

    this._router.get(
      '/dashboard/:userId',
      this.controller.getUnitActivityCompletionRateForUser,
    );

    this._router.get(
      '/dashboard/profesor/:userId',
      this.controller.getProfesorActivitiesStatistic,
    );
  }
}

export = new StatisticRouter().router;
