import { createClient } from "@supabase/supabase-js";
export const supabaseCanbinsBuckName = "cabins";
export const supabaseUrl = "https://ihjrviabjxywcyvkgnxl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloanJ2aWFianh5d2N5dmtnbnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MjAxNDAsImV4cCI6MjAwNTM5NjE0MH0.f8_tCLlvRYtEbdcTKco7JLC10EHUfdz1sabDlcEc9t0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
