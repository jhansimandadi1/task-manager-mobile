import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { registerBackgroundTask } from '../src/background/registerBackgroundTask';
import { store } from '../src/store/store';

import '../src/background/backgroundTask';

export default function RootLayout() {
  useEffect(() => {
    registerBackgroundTask();
  }, []);

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Tasks',
          }}
        />

        <Stack.Screen
          name="create-task"
          options={{
            title: 'Create Task',
          }}
        />

        <Stack.Screen
          name="task/[id]"
          options={{
            title: 'Task Details',
          }}
        />
      </Stack>
    </Provider>
  );
}