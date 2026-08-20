import * as BackgroundTask from 'expo-background-task';
import { Platform } from 'react-native';

import {
  BACKGROUND_TASK_NAME
} from './backgroundTask';

export async function registerBackgroundTask() {
  // Background tasks are native-only.
  if (Platform.OS === 'web') {
    console.log(
      'Skipping background task registration on web',
    );

    return;
  }

  try {
    const isRegistered =
      await BackgroundTask.isTaskRegisteredAsync(
        BACKGROUND_TASK_NAME,
      );

    if (!isRegistered) {
      await BackgroundTask.registerTaskAsync(
        BACKGROUND_TASK_NAME,
      );

      console.log(
        'Background task registered',
      );
    } else {
      console.log(
        'Background task already registered',
      );
    }
  } catch (error) {
    console.error(
      'Failed to register background task',
      error,
    );
  }
}