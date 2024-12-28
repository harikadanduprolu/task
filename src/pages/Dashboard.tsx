import React from 'react';
import { BarChart, Users, CheckSquare, AlertCircle } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { useTaskStore } from '../store/taskStore';

export function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks);

  const stats = [
    {
      name: 'Total Tasks',
      value: tasks.length,
      icon: CheckSquare,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Team Members',
      value: '12',
      icon: Users,
      change: '+2.02%',
      changeType: 'positive',
    },
    {
      name: 'Completion Rate',
      value: '87.4%',
      icon: BarChart,
      change: '+5.4%',
      changeType: 'positive',
    },
    {
      name: 'Overdue Tasks',
      value: '3',
      icon: AlertCircle,
      change: '-1.39%',
      changeType: 'negative',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Your team's productivity at a glance
        </p>
      </div>

      <div className="mt-4">
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
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'positive'
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
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.slice(0, 6).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}