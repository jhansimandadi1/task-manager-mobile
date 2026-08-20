import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class GetTasks {
  constructor(private repository: TaskRepository) {}

  execute(): Promise<Task[]> {
    return this.repository.getTasks();
  }
}