import React from 'react';
import { Calendar, Clock, Tag, MessageSquare, Trash2, Edit } from 'lucide-react';
import { Task } from '../types';
import { cn, formatDate } from '../lib/utils';
import { useTaskStore } from '../store/taskStore';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  blocked: 'bg-red-100 text-red-800',
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    updateTaskStatus(task.id, e.target.value as Task['status']);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full border-0',
              statusColors[task.status]
            )}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.deadline)}</span>
        </div>
        
        {task.tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{task.tags.length}</span>
          </div>
        )}
        
        {task.comments.length > 0 && (
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{task.comments.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}