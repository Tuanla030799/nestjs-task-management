import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from '../task-status.enum';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => UserEntity, (user) => user.tasks, { eager: false })
  @JoinColumn({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
