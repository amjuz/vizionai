import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdminClient = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
