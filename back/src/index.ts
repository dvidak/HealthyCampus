import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { connection } from './connection/Connection';
import AppRouter from './router';

class App {
  public app: express.Application;
  public router = AppRouter;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api', this.router);

    connection
      .then(() => {
        this.app.listen(4000, () => {
          console.info('Express server listening on http://localhost:4000');
        });
      })
      .catch((error) => console.log(error));
  }
}

export default new App().app;
