import { supabase } from '../supabase';
import type { TaskAttachment } from '../../types';

export async function uploadAttachment(
  taskId: string,
  file: File,
  onProgress?: (progress: number) => void
) {
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('task-attachments')
    .upload(fileName, file, {
      onUploadProgress: ({ loaded, total }) => {
        onProgress?.(Math.round((loaded / total) * 100));
      },
    });

  if (error) throw error;

  const attachment: Omit<TaskAttachment, 'id' | 'created_at'> = {
    task_id: taskId,
    name: file.name,
    file_url: data.path,
    content_type: file.type,
    size_bytes: file.size,
    uploaded_by: (await supabase.auth.getUser()).data.user?.id!,
  };

  const { data: savedAttachment, error: saveError } = await supabase
    .from('task_attachments')
    .insert(attachment)
    .select()
    .single();

  if (saveError) throw saveError;
  return savedAttachment;
}

export async function getTaskAttachments(taskId: string) {
  const { data, error } = await supabase
    .from('task_attachments')
    .select(`
      *,
      uploaded_by:users(*)
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteAttachment(id: string) {
  const { data: attachment } = await supabase
    .from('task_attachments')
    .select('file_url')
    .eq('id', id)
    .single();

  if (attachment) {
    await supabase.storage
      .from('task-attachments')
      .remove([attachment.file_url]);
  }

  const { error } = await supabase
    .from('task_attachments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}