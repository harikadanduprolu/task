import React from 'react';
import { Shield } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Security Settings
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Manage your account security and authentication preferences.</p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Shield className="h-5 w-5 mr-2 text-gray-500" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}