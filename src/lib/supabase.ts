import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kujabhqmjkxjsxncnltg.supabase.co";
const supabaseKey = "sb_publishable_ZPS8wPxA5KzsrJhc0nB_6A_akZRjdRZ";

export const supabase = createClient(supabaseUrl, supabaseKey);
