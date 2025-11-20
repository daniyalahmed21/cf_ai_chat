import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Message {
  id?: string
  user_id: string
  content: string
  is_user: boolean
  created_at?: string
}

export const messageService = {
  async loadMessages(userId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error loading messages:', error)
      return []
    }

    return data || []
  },

  async saveMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .insert([message])

    if (error) {
      console.error('Error saving message:', error)
    }
  },

  async clearHistory(userId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Error clearing history:', error)
    }
  }
}
