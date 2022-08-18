import { TaskStatus } from '../task.model';

export class GetTasksFilterDTOs {
  status?: TaskStatus;
  search?: string;
}
