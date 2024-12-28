import { create } from 'zustand';
import type { Task } from '../types';
import { getTasks, createTask, updateTask, deleteTask } from '../lib/api/tasks';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  addTask: async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      set((state) => ({
        tasks: [newTask, ...state.tasks],
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },
  updateTaskStatus: async (taskId, status) => {
    try {
      const updatedTask = await updateTask(taskId, { status });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },
  deleteTask: async (taskId) => {
    try {
      await deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },
}));