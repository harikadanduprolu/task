import { supabase } from './supabase';
import type { User } from '../types';

export async function signUp(email: string, password: string, fullName: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (authError) throw authError;
  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) return null;

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .maybeSingle(); // Use maybeSingle instead of single to handle no results

  if (error) throw error;
  return profile;
}