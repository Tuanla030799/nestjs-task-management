import { UserEntity } from '../../src/components/auth/entities/user.entity';
import { TaskEntity } from '../../src/components/tasks/entities/task.entity';
import { TaskStatus } from './../../src/components/tasks/task-status.enum';
import { Connection } from 'typeorm';

export default class TaskTableSeeder {
  async up(connection: Connection): Promise<any> {
    const seed = [
      {
        user_id: 1,
        title: 'One typeORM how to seed database',
        description:
          'Is there a similar approach to seed the database in TypeOrm? If not, what is the recommended way of doing it?',
        status: TaskStatus.DONE,
      },
      {
        user_id: 2,
        title: 'Two typeORM how to seed database',
        description:
          'Is there a similar approach to seed the database in TypeOrm? If not, what is the recommended way of doing it?',
        status: TaskStatus.IN_PROGRESS,
      },
      {
        user_id: 1,
        title: 'Three typeORM how to seed database',
        description:
          'Is there a similar approach to seed the database in TypeOrm? If not, what is the recommended way of doing it?',
        status: TaskStatus.OPEN,
      },
    ];

    const tasks = seed.map((item) => {
      const task = new TaskEntity();
      task.user_id = item.user_id;
      task.title = item.title;
      task.description = item.description;
      task.status = item.status;
      return task;
    });

    await connection.manager.save(tasks);
  }
}
