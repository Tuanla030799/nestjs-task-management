import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { TasksService } from '../services/tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFiltersDTO } from '../dto/get-taks-filter.dto';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/components/auth/get-user.decorator';
import { TransformInterceptor } from 'src/transform.interceptor';
import { User } from '../../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(GetTasksFiltersDTO))
  getTasks(
    @Query() filterDto: GetTasksFiltersDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
