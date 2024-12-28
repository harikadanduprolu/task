import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Notification Preferences
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Choose how you want to be notified about updates.</p>
        </div>
        <div className="mt-5">
          <div className="space-y-4">
            {['Email', 'Push', 'Desktop'].map((type) => (
              <div key={type} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`notifications-${type.toLowerCase()}`}
                    name={`notifications-${type.toLowerCase()}`}
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={`notifications-${type.toLowerCase()}`}
                    className="font-medium text-gray-700"
                  >
                    {type} Notifications
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}