import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class CreateTask {
  constructor(private repository: TaskRepository) {}

  execute(title: string): Promise<Task> {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      throw new Error('Task title is required');
    }

    return this.repository.createTask(trimmedTitle);
  }
}