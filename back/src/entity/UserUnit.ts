import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from './Unit';
import { User } from './User';

@Entity()
export class UserUnit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Unit, { eager: true, onDelete: 'CASCADE' })
  unit: Unit;

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    length: 100,
  })
  academicYear: string;
}
