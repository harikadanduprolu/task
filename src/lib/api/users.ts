import { supabase } from '../supabase';
import type { User } from '../../types';

export async function updateProfile(updates: Partial<User>) {
  const { data, error } = await supabase
    .rpc('update_user_profile', {
      full_name: updates.full_name,
      avatar_url: updates.avatar_url
    });

  if (error) throw error;
  return data;
}