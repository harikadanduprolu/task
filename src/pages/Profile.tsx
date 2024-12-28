import React from 'react';
import { User, Mail, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store';
import { updateProfile } from '../lib/api/profile';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar_url: z.string().url().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function Profile() {
  const { user, setUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      avatar_url: user?.avatar_url || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedUser = await updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.full_name}
              className="h-20 w-20 rounded-full"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-10 w-10 text-gray-500" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.full_name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register('full_name')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Camera className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                {...register('avatar_url')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            {errors.avatar_url && (
              <p className="mt-1 text-sm text-red-600">{errors.avatar_url.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}