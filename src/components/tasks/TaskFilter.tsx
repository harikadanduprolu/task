import React from 'react';
import { Filter } from 'lucide-react';

export function TaskFilter() {
  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        defaultValue="all"
      >
        <option value="all">All Tasks</option>
        <option value="assigned">Assigned to me</option>
        <option value="created">Created by me</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="blocked">Blocked</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <Filter className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}