import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class DeleteTask {
  constructor(private repository: TaskRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.deleteTask(id);
  }
}