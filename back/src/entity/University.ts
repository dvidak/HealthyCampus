import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from './Unit';

@Entity()
export class University extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @OneToMany((type) => Unit, (Unit) => Unit.university, {
    eager: true,
  })
  units: Unit[];
}
