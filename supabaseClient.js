import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pidseszgiwkwktyyvajy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZHNlc3pnaXdrd2t0eXl2YWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNzYxODAsImV4cCI6MjA3MTg1MjE4MH0.5HfMeeVE7l_dib4pVCmAa5w8kZlP0xPfIvpW1-EfrJM'

export const supabase = createClient(supabaseUrl, supabaseKey)
