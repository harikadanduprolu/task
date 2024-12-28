import React from 'react';
import { User } from 'lucide-react';
import { ProfileForm } from './ProfileForm';
import { useAuthStore } from '../../store';

export function UserSettings() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            {user?.avatar_url ? (
              <img
                className="h-12 w-12 rounded-full"
                src={user.avatar_url}
                alt={user.full_name}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-500">Update your personal information and profile picture</p>
          </div>
        </div>
        
        <ProfileForm />
      </div>
    </div>
  );
}