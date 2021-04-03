import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { University } from '../entity/University';

export class UniversityController {
	constructor() {}

	public getAllUniversities(_: Request, res: Response) {
		connection
			.then(async (connection) => {
				const universities: University[] = await connection.manager.find(
					University,
				);
				res.status(200).json(universities);
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public createUniversity(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const university = new University();
				university.name = req.body.name;

				await connection.manager.save(university);
				res.status(201).json({ message: 'Successfully created.' });
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public updateUniversity(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let university = await connection.manager.findOne(
					University,
					req.params.universityId,
				);

				if (university) {
					university.name = req.body.name;
					await connection.manager.save(university);
					res.status(204).json({ message: 'Successfully updated.' });
				} else {
					res
						.status(404)
						.json({ message: 'University with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public getUniversityById(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let university = await connection.manager.findOne(
					University,
					req.params.universityId,
				);

				if (university) {
					res.status(200).json(university);
				} else {
					res
						.status(404)
						.json({ message: 'University with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public deleteUniversity(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const university = await connection.manager.findOne(
					University,
					req.params.universityId,
				);

				if (university) {
					await connection.manager.remove(University, university);
					res.status(204).json({ message: 'Successfully removed.' });
				} else {
					res
						.status(404)
						.json({ message: 'University with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}
}
