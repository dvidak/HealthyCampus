import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { Unit } from '../entity/Unit';
import { University } from '../entity/University';
import { UserUnit } from '../entity/UserUnit';

export class UnitController {
	constructor() {}

	public getAllUnits(_: Request, res: Response) {
		connection
			.then(async (connection) => {
				const units: Unit[] = await connection.manager.find(Unit);
				res.status(200).json(units);
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public createUnit(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const university = await connection.manager.findOne(
					University,
					req.body.universityId,
				);

				if (university) {
					let unit = new Unit();
					unit.name = req.body.name;
					unit.university = university;
					await connection.manager.save(unit);
					res.status(201).json({ message: 'Successfully created.' });
				} else {
					res.status(400).json({
						error:
							'Unit must belong to some university. University with given id does not exist',
					});
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public updateUnit(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let university: University;
				university = await connection.manager.findOne(
					University,
					req.body.universityId,
				);
				let oldUnit: Unit = await connection.manager.findOne(
					Unit,
					req.params.id,
					{ relations: ['university'] },
				);

				if (oldUnit) {
					oldUnit.name = req.body.name;
					oldUnit.university = university;
					connection.manager.save(oldUnit);
					res.status(204).json();
				} else {
					res
						.status(404)
						.json({ message: 'Unit with given id does not exist' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public getUnitById(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				let unit = await connection.manager.findOne(Unit, req.params.id);
				if (unit) {
					res.status(200).json(unit);
				} else {
					res
						.status(404)
						.json({ message: 'Unit with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}

	public deleteUnit(req: Request, res: Response) {
		connection
			.then(async (connection) => {
				const unit = await connection.manager.findOne(Unit, req.params.id);
				const userUnit = await connection.manager.find(UserUnit, {
					unit: unit,
				});

				if (userUnit.length > 0) {
					res.status(400).json({
						message:
							'You are not allowed to delete a unit if there are students connected to it.',
					});
				} else if (unit) {
					await connection.manager.remove(Unit, unit);
					res.status(204).json({ message: 'Successfully removed.' });
				} else {
					res
						.status(404)
						.json({ message: 'Unit with given id does not exist.' });
				}
			})
			.catch((error) => {
				res.status(400).json({ error: error });
			});
	}
}
