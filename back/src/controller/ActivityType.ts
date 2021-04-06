import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { ActivityType } from '../entity/ActivityType';

class ActivityTypeController {
	public getAllActivityTypes(_: Request, res: Response) {
		connection
			.then(async (connection) => {
				const activityTypes: ActivityType[] = await connection.manager.find(
					ActivityType,
				);
				res.status(200).json(activityTypes);
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public createActivityType(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const activityType = new ActivityType();
				activityType.type = req.body.type;

				await connection.manager.save(activityType);
				res.status(201).json({ message: 'Successfully created.' });
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public updateActivityType(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let activityType = await connection.manager.findOne(
					ActivityType,
					req.params.id,
				);

				if (activityType) {
					activityType.type = req.body.type;
					await connection.manager.save(activityType);
					res.status(204).json({ message: 'Successfully updated.' });
				} else {
					res
						.status(404)
						.json({ message: 'ActivityType with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public getActivityTypeById(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let activityType = await connection.manager.findOne(
					ActivityType,
					req.params.id,
				);

				if (activityType) {
					res.status(200).json(activityType);
				} else {
					res
						.status(404)
						.json({ message: 'ActivityType with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public deleteActivityType(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const activityType = await connection.manager.findOne(
					ActivityType,
					req.params.id,
				);

				if (activityType) {
					await connection.manager.remove(ActivityType, activityType);
					res.status(204).json({ message: 'Successfully removed.' });
				} else {
					res
						.status(404)
						.json({ message: 'ActivityType with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}
}

export = new ActivityTypeController();
