import { Router } from 'express';
import AuthController from '../controller/Auth';

class AuthRouter {
  private _router = Router();
  private controller = AuthController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.post('/login', this.controller.login);
    this._router.post('/signUp', this.controller.signUp);
    this._router.get('/fitbit', this.controller.fitBitAuth);
  }
}

export = new AuthRouter().router;
