import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { TaskEntity } from '../entities/task.entity';
import { GetTasksFiltersDTO } from '../dto/get-taks-filter.dto';
import { UserEntity } from '../../auth/entities/user.entity';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {
  async getTasks(
    filterDto: GetTasksFiltersDTO,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTasks(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    console.log('repository', createTaskDto);
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }
}
