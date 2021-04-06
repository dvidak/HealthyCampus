import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { University } from '../entity/University';

class UniversityController {
	public async getAllUniversities(_: Request, res: Response) {
		const conn = await connection;

		try {
			const universities: University[] = await conn.manager.find(University);
			res.status(200).json(universities);
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async createUniversity(req: Request, res: Response) {
		const conn = await connection;

		try {
			const university = new University();
			university.name = req.body.name;
			await conn.manager.save(university);
			res.status(201).json({ message: 'Successfully created.' });
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async updateUniversity(req: Request, res: Response) {
		const conn = await connection;

		try {
			let university = await conn.manager.findOne(University, req.params.id);

			if (university) {
				university.name = req.body.name;
				await conn.manager.save(university);
				res.status(204).json({ message: 'Successfully updated.' });
			} else {
				res
					.status(404)
					.json({ message: 'University with given id does not exist.' });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async getUniversityById(req: Request, res: Response) {
		const conn = await connection;

		try {
			let university = await conn.manager.findOne(University, req.params.id);

			if (university) {
				res.status(200).json(university);
			} else {
				res
					.status(404)
					.json({ message: 'University with given id does not exist.' });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	}

	public async deleteUniversity(req: Request, res: Response) {
		const conn = await connection;

		try {
			const university = await conn.manager.findOne(University, req.params.id);

			if (university) {
				await conn.manager.remove(University, university);
				res.status(204).json({ message: 'Successfully removed.' });
			} else {
				res
					.status(404)
					.json({ message: 'University with given id does not exist.' });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	}
}

export = new UniversityController();
