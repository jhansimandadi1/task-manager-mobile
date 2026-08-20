import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class UpdateTask {
  constructor(private repository: TaskRepository) {}

  execute(task: Task): Promise<Task> {
    if (!task.title.trim()) {
      throw new Error('Task title is required');
    }

    return this.repository.updateTask(task);
  }
}