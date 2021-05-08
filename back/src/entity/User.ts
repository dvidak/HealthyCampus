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

  @Column({ nullable: true })
  avatar: string | null;

  @ManyToOne((type) => Role)
  role: Role;

  @ManyToOne((type) => UserUnit, (UserUnit) => UserUnit.user)
  userUnit: UserUnit;

  @OneToOne((type) => FitbitAccount, (FitbitAccount) => FitbitAccount.user)
  fitbit: FitbitAccount;
}
