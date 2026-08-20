import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { taskRepository } from '../data/repositories';
import { Task } from '../domain/entities/Task';

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return taskRepository.getTasks();
  },
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (title: string) => {
    return taskRepository.createTask(title);
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    return taskRepository.updateTask(task);
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id: number) => {
    await taskRepository.deleteTask(id);

    return id;
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Unable to load tasks';
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          task => task.id !== action.payload,
        );
      });
  },
});

export default taskSlice.reducer;