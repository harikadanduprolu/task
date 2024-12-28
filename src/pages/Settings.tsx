import React from 'react';
import { UserSettings } from '../components/settings/UserSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';

export function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-8">
        <UserSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}