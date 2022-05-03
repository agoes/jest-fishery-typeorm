import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatuses } from '../enums/index.';
import { User } from './user';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;

  @Column({ enum: TaskStatuses })
  status: TaskStatuses;
}