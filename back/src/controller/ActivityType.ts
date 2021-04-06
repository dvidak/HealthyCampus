import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { ActivityType } from '../entity/ActivityType';

class ActivityTypeController {
	public async getAllActivityTypes(_: Request, res: Response) {
		const conn = await connection;

		try {
			const activityTypes: ActivityType[] = await conn.manager.find(
				ActivityType,
			);
			res.status(200).json(activityTypes);
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async createActivityType(req: Request, res: Response) {
		const conn = await connection;

		try {
			const activityType = new ActivityType();
			activityType.type = req.body.type;

			await conn.manager.save(activityType);
			res.status(201).json({ message: 'Successfully created.' });
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async updateActivityType(req: Request, res: Response) {
		const conn = await connection;

		try {
			let activityType = await conn.manager.findOne(
				ActivityType,
				req.params.id,
			);

			if (activityType) {
				activityType.type = req.body.type;
				await conn.manager.save(activityType);
				res.status(204).json({ message: 'Successfully updated.' });
			} else {
				res
					.status(404)
					.json({ message: 'ActivityType with given id does not exist.' });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async getActivityTypeById(req: Request, res: Response) {
		const conn = await connection;

		try {
			let activityType = await conn.manager.findOne(
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
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async deleteActivityType(req: Request, res: Response) {
		const conn = await connection;

		try {
			const activityType = await conn.manager.findOne(
				ActivityType,
				req.params.id,
			);

			if (activityType) {
				await conn.manager.remove(ActivityType, activityType);
				res.status(204).json({ message: 'Successfully removed.' });
			} else {
				res
					.status(404)
					.json({ message: 'ActivityType with given id does not exist.' });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	}
}

export = new ActivityTypeController();
