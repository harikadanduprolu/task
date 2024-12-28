import { supabase } from '../supabase';
import type { Comment } from '../../types';

export async function getTaskComments(taskId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:users(*)
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select()
    .single();

  if (error) throw error;
  return data;
}