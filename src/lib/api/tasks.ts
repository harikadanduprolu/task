import { supabase } from '../supabase';
import type { Task } from '../../types';

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      assignee:users!assignee_id(*),
      team:teams(*),
      comments(*),
      attachments:task_attachments(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select(`
      *,
      assignee:users!assignee_id(*),
      team:teams(*),
      comments(*),
      attachments:task_attachments(*)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      assignee:users!assignee_id(*),
      team:teams(*),
      comments(*),
      attachments:task_attachments(*)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}