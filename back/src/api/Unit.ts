import { Router } from 'express';
import UnitController from '../controller/Unit';

class UnitRouter {
  private _router = Router();
  private controller = UnitController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('', this.controller.getAllUnits);
    this._router.post('', this.controller.createUnit);

    this._router.get('/:id', this.controller.getUnitById);
    this._router.put('/:id', this.controller.updateUnit);
    this._router.delete('/:id', this.controller.deleteUnit);
  }
}

export = new UnitRouter().router;
