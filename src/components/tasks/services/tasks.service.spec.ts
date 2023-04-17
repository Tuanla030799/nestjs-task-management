import { TasksRepository } from '../repositories/task.repository';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  id: 1,
  email: 'user@example.com',
  password: 'Aa@123456',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls taskRepository.getTask and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
});
