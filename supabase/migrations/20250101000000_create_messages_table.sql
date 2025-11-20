CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  content text NOT NULL,
  is_user boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read messages" ON messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON messages;
DROP POLICY IF EXISTS "Anyone can delete messages" ON messages;

CREATE POLICY "Anyone can read messages"
  ON messages
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can delete messages"
  ON messages
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_messages_user_id_created ON messages(user_id, created_at);
