import { Task } from '../entities/Task';

export interface TaskRepository {
  getTasks(): Promise<Task[]>;

  getTask(id: number): Promise<Task>;

  createTask(title: string): Promise<Task>;

  updateTask(task: Task): Promise<Task>;

  deleteTask(id: number): Promise<void>;
}