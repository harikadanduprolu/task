import React from 'react';
import { Users, CheckSquare, MessageSquare, Clock } from 'lucide-react';

const stats = [
  {
    name: 'Total Teams',
    value: '12',
    icon: Users,
    change: '+2',
    changeType: 'increase',
  },
  {
    name: 'Active Tasks',
    value: '64',
    icon: CheckSquare,
    change: '+5',
    changeType: 'increase',
  },
  {
    name: 'Communications',
    value: '245',
    icon: MessageSquare,
    change: '+24',
    changeType: 'increase',
  },
  {
    name: 'Avg. Response Time',
    value: '2.4h',
    icon: Clock,
    change: '-0.3h',
    changeType: 'decrease',
  },
];

export function TeamStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <item.icon className="h-6 w-6 text-white" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}