import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { FitbitAccount } from './FitbitAccount';
import { Role } from './Role';
import { UserUnit } from './UserUnit';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 50,
	})
	firstName: string;

	@Column({
		length: 50,
	})
	lastName: string;

	@Column({
		length: 50,
	})
	email: string;

	@Column()
	password: string;

	@ManyToOne((type) => Role, { eager: true })
	role: Role;

	@ManyToOne((type) => UserUnit, (UserUnit) => UserUnit.id)
	userUnit: UserUnit;

	@OneToOne((type) => FitbitAccount, (FitbitAccount) => FitbitAccount.user, {
		eager: true,
	})
	fitbit: FitbitAccount;
}
