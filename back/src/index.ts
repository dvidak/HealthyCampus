import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Router from './router';
import { connection } from './connection/Connection';

class App {
	public app: express.Application;
	public router: Router;

	constructor() {
		express.json();
		express.urlencoded();
		this.app = express();
		this.app.use(cors());
		this.router = new Router();
		this.router.routes(this.app);

		connection
			.then(() => {
				this.app.listen(3000, () => {
					console.info('Express server listening on http://localhost:4000');
				});
			})
			.catch((error) => console.log(error));
	}
}

export default new App().app;
