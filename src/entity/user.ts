import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { Task } from './task';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];
}