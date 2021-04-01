import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './University';
import { UserUnit } from './UserUnit';

@Entity()
export class Unit extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
	})
	name: string;

	@ManyToOne((type) => University, (University) => University.units)
	university: University;

	@ManyToOne((type) => UserUnit, (UserUnit) => UserUnit.id)
	userUnit: UserUnit;
}
