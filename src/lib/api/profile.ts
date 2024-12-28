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

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}