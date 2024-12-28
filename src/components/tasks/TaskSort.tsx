import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function TaskSort() {
  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        defaultValue="newest"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="deadline">Deadline</option>
        <option value="priority">Priority</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ArrowUpDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}