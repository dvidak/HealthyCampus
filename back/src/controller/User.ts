import { Request, Response } from 'express';

class UserController {
	public getAllUsers(req: Request, res: Response) {
		res.send('Helo user');
	}
}

export = new UserController();
