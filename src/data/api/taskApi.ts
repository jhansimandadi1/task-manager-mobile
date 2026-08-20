import { Task } from '../../domain/entities/Task';
import { apiClient } from './apiClient';

interface TasksResponse {
  todos: Task[];
  total: number;
  skip: number;
  limit: number;
}

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<TasksResponse>('/todos');

    return response.data.todos;
  },

  async getTask(id: number): Promise<Task> {
    const response = await apiClient.get<Task>(`/todos/${id}`);

    return response.data;
  },

  async createTask(title: string): Promise<Task> {
    const response = await apiClient.post<Task>('/todos/add', {
      todo: title,
      completed: false,
      userId: 1,
    });

    return response.data;
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await apiClient.put<Task>(
      `/todos/${task.id}`,
      {
        todo: task.title,
        completed: task.completed,
      },
    );

    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  },
};