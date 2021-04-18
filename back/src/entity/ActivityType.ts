import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

@Entity()
@Unique(['fitbitActivityId'])
export class ActivityType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 500,
	})
	type: string;

	@Column({
		length: 500,
	})
	subType: string;

	@Column()
	fitbitActivityId: number;
}
