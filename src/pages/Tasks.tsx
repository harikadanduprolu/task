import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { useTaskStore } from '../store/taskStore';
import { TaskFilter } from '../components/tasks/TaskFilter';
import { TaskSort } from '../components/tasks/TaskSort';
import { TaskForm } from '../components/tasks/TaskForm';

export function Tasks() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading tasks: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and track your team's tasks
            </p>
          </div>
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <TaskFilter />
        <TaskSort />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {showNewTaskForm && <TaskForm onClose={() => setShowNewTaskForm(false)} />}
    </div>
  );
}