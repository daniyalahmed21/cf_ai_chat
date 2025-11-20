import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const setupDatabase = async () => {
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (error) {
      console.error('Error setting up database:', error);
    } else {
      console.log('Database setup complete!');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

setupDatabase();
