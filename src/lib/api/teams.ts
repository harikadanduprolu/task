import { supabase } from '../supabase';
import type { Team } from '../../types';

export async function getTeams() {
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      members:team_members(
        *,
        user:users(*)
      )
    `);

  if (error) throw error;
  return data;
}

export async function createTeam(team: Omit<Team, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('teams')
    .insert(team)
    .select(`
      *,
      members:team_members(
        *,
        user:users(*)
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTeam(id: string, updates: Partial<Team>) {
  const { data, error } = await supabase
    .from('teams')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      members:team_members(
        *,
        user:users(*)
      )
    `)
    .single();

  if (error) throw error;
  return data;
}