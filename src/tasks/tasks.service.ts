import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTOs } from './dto/get-taks-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(fillterDto: GetTasksFilterDTOs): Promise<Task[]> {
    return this.tasksRepository.getTasks(fillterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id });

    if (!found) throw new NotFoundException(`Task ${id} not found`);

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTasks(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    this.tasksRepository.save(task);

    return task;
  }
}
