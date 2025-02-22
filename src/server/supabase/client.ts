import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const supabase = createClient(supabaseUrl, supabaseKey);
