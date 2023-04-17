import { Injectable } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFiltersDTO } from '../dto/get-taks-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TasksRepository } from '../repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(
    filterDto: GetTasksFiltersDTO,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) throw new NotFoundException(`Task ${id} not found`);

    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksRepository.createTasks(createTaskDto, user);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    this.tasksRepository.save(task);

    return task;
  }
}
