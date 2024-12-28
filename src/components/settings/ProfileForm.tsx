import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store';
import { updateProfile } from '../../lib/api/users';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, setUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      avatarUrl: user?.avatar_url || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedUser = await updateProfile({
        full_name: data.fullName,
        avatar_url: data.avatarUrl || null,
      });
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          {...register('fullName')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
          Avatar URL
        </label>
        <input
          {...register('avatarUrl')}
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="https://example.com/avatar.jpg"
        />
        {errors.avatarUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.avatarUrl.message}</p>
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
  );
}