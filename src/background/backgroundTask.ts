import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

import { taskRepository } from '../data/repositories';

export const BACKGROUND_TASK_NAME =
  'task-sync-background-task';

TaskManager.defineTask(
  BACKGROUND_TASK_NAME,
  async () => {
    try {
      const tasks =
        await taskRepository.getTasks();

      const pendingTasks =
        tasks.filter(
          task => !task.completed,
        );

      console.log(
        `Background sync: ${pendingTasks.length} pending tasks`,
      );

      return BackgroundTask.BackgroundTaskResult.Success;
    } catch (error) {
      console.error(
        'Background sync failed',
        error,
      );

      return BackgroundTask.BackgroundTaskResult.Failed;
    }
  },
);