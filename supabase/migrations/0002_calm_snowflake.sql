/*
  # Add task activity tracking and team invites

  1. New Tables
    - `task_activities`: Tracks all changes to tasks
    - `team_invites`: Manages team invitations
  
  2. Changes
    - Add activity tracking triggers
    - Add team invitation management
    
  3. Security
    - Enable RLS on new tables
    - Add policies for activity viewing and invite management
*/

-- Task activities table for tracking changes
CREATE TABLE task_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Team invites table
CREATE TABLE team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  invited_by UUID REFERENCES users(id),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, email)
);

-- Enable RLS
ALTER TABLE task_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invites ENABLE ROW LEVEL SECURITY;

-- Task activities policies
CREATE POLICY "Team members can view task activities"
  ON task_activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN team_members ON team_members.team_id = tasks.team_id
      WHERE tasks.id = task_activities.task_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Team invites policies
CREATE POLICY "Team admins can create invites"
  ON team_invites FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invites.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can view their invites"
  ON team_invites FOR SELECT
  TO authenticated
  USING (
    email = (SELECT email FROM users WHERE id = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invites.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('owner', 'admin')
    )
  );

-- Function to track task changes
CREATE OR REPLACE FUNCTION track_task_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO task_activities (task_id, user_id, action, details)
  VALUES (
    NEW.id,
    auth.uid(),
    CASE
      WHEN TG_OP = 'INSERT' THEN 'created'
      WHEN TG_OP = 'UPDATE' THEN 'updated'
      WHEN TG_OP = 'DELETE' THEN 'deleted'
    END,
    CASE
      WHEN TG_OP = 'INSERT' THEN jsonb_build_object('task', row_to_json(NEW))
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object(
        'old', row_to_json(OLD),
        'new', row_to_json(NEW),
        'changes', (
          SELECT jsonb_object_agg(key, value)
          FROM jsonb_each(to_jsonb(NEW))
          WHERE to_jsonb(NEW) ? key
          AND to_jsonb(OLD) ? key
          AND to_jsonb(NEW) ->> key IS DISTINCT FROM to_jsonb(OLD) ->> key
        )
      )
      WHEN TG_OP = 'DELETE' THEN jsonb_build_object('task', row_to_json(OLD))
    END
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for task activity tracking
CREATE TRIGGER track_task_changes_insert
  AFTER INSERT ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION track_task_changes();

CREATE TRIGGER track_task_changes_update
  AFTER UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION track_task_changes();

CREATE TRIGGER track_task_changes_delete
  AFTER DELETE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION track_task_changes();