import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityType } from './ActivityType';
import { UserActivity } from './UserActivity';
import { UserUnit } from './UserUnit';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  description: string;

  // Start and End date, in seconds
  @Column({ type: 'bigint', nullable: true })
  startDate: number;

  @Column({ type: 'bigint', nullable: true })
  endDate: number;

  @Column({ nullable: true, type: 'float' })
  goalDistance: number;

  @Column({ nullable: true, type: 'float' })
  goalDuration: number;

  @Column({ nullable: true, type: 'float' })
  goalCalories: number;

  @Column({ nullable: true, type: 'float' })
  goalElevation: number;

  @OneToOne((type) => ActivityType)
  @JoinColumn()
  type: ActivityType;

  @ManyToOne((type) => UserUnit, { onDelete: 'CASCADE' })
  createdBy: UserUnit;

  @OneToMany((type) => UserActivity, (UserActivity) => UserActivity.activity, {
    nullable: true,
  })
  userActivities: UserActivity[];
}
