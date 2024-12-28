export type User = {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'manager' | 'member';
  created_at: string;
  updated_at: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  members?: TeamMember[];
};

export type TeamMember = {
  id: string;
  team_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
  user?: User;
};

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: string;
  team_id?: string;
  creator_id: string;
  tags: string[];
  deadline?: string;
  created_at: string;
  updated_at: string;
  assignee?: User;
  team?: Team;
  comments?: Comment[];
  attachments?: TaskAttachment[];
};

export type Comment = {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: User;
};

export type TaskAttachment = {
  id: string;
  task_id: string;
  name: string;
  file_url: string;
  content_type: string;
  size_bytes: number;
  uploaded_by: string;
  created_at: string;
  uploader?: User;
};

export type NotificationType = 
  | 'task_assigned'
  | 'task_updated'
  | 'comment_added'
  | 'team_invite'
  | 'mention';

export type Notification = {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  content?: string;
  read_at?: string;
  created_at: string;
};