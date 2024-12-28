/*
  # Fix User Policies

  1. Changes
    - Drop existing user policies
    - Add new policies for proper user access
    - Add profile update function
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create new policies
CREATE POLICY "Users can view any profile"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create profile update function
CREATE OR REPLACE FUNCTION update_user_profile(
  full_name TEXT,
  avatar_url TEXT
) RETURNS users AS $$
DECLARE
  updated_user users;
BEGIN
  UPDATE users
  SET
    full_name = COALESCE($1, full_name),
    avatar_url = COALESCE($2, avatar_url),
    updated_at = now()
  WHERE id = auth.uid()
  RETURNING * INTO updated_user;
  
  RETURN updated_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;