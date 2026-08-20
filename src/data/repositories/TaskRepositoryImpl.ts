import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { taskApi } from '../api/taskApi';

export class TaskRepositoryImpl implements TaskRepository {
  async getTasks(): Promise<Task[]> {
    return taskApi.getTasks();
  }

  async getTask(id: number): Promise<Task> {
    return taskApi.getTask(id);
  }

  async createTask(title: string): Promise<Task> {
    return taskApi.createTask(title);
  }

  async updateTask(task: Task): Promise<Task> {
    return taskApi.updateTask(task);
  }

  async deleteTask(id: number): Promise<void> {
    return taskApi.deleteTask(id);
  }
}