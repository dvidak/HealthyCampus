import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from './Activity';
import { UserUnit } from './UserUnit';

@Entity()
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'float' })
  distance: number;

  @Column({ nullable: true, type: 'float' })
  duration: number;

  @Column({ nullable: true, type: 'float' })
  calories: number;

  @Column({ nullable: true, type: 'float' })
  elevation: number;

  // @Column({ nullable: true })
  // dataOrigin: DataOrigin;

  @ManyToOne((type) => UserUnit, { eager: true, onDelete: 'CASCADE' })
  student: UserUnit;

  @ManyToOne((type) => Activity, { eager: true })
  activity: Activity;
}
