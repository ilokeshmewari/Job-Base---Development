import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xegohurgvfpitteuvwbl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZ29odXJndmZwaXR0ZXV2d2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NTY2MjAsImV4cCI6MjA1NTUzMjYyMH0.k89uxjJne5yE9WQ7JbAEua8Dy4VHBo-9HzgS7O5SwwI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
