import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityType extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 50,
	})
	type: string;
}
