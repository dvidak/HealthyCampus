import { Router } from 'express';
import UniversityController from '../controller/University';

class UniversityRouter {
  private _router = Router();
  private controller = UniversityController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get('', this.controller.getAllUniversities);
    this._router.post('', this.controller.createUniversity);

    this._router.get('/:id', this.controller.getUniversityById);
    this._router.put('/:id', this.controller.updateUniversity);
    this._router.delete('/:id', this.controller.deleteUniversity);
  }
}

export = new UniversityRouter().router;
