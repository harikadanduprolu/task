import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { Task } from '../../types';
import { useTaskStore } from '../../store/taskStore';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  tags: z.string(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onClose: () => void;
}

export function TaskForm({ onClose }: TaskFormProps) {
  const addTask = useTaskStore((state) => state.addTask);
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: 'pending',
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      deadline: new Date(data.deadline),
      createdAt: new Date(),
      updatedAt: new Date(),
      attachments: [],
      comments: [],
    };
    
    addTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="datetime-local"
              {...register('deadline')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              {...register('tags')}
              placeholder="frontend, bug, urgent"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}