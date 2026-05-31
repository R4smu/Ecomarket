import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sopavnxqsxsvycczsmpi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvcGF2bnhxc3hzdnljY3pzbXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTY4MjAsImV4cCI6MjA5NTc3MjgyMH0.OUvSDqYc-aZ3DfE58IjmkR1Whii8VIei1bH2bQv7qxQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)