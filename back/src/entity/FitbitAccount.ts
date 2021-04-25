import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class FitbitAccount extends BaseEntity {
  @PrimaryColumn()
  fitbitId: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column()
  refreshToken: string;

  @OneToOne((type) => User, { nullable: false })
  @JoinColumn()
  user: User;
}
