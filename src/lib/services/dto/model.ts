import { getUser, TGetUserAuth } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { DbClient } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getModelCount(
  { user,client }: { user: TGetUserAuth , client?: SupabaseClient},
  
) {
  const supabase = client ?? (await createClient());
  if (!user) {
    throw new Error("Authentication failed");
  }
  const { data, error } = await supabase
    .from("models")
    .select("*")
    .eq("user_id", user!.id);

  if (error) {
    throw new Error("Failed to fetch model training details");
  }

  return data?.length;
}

export async function fetchModelDto(supabase: DbClient) {
  const user = await getUser(supabase);
  const { data, error } = await supabase
    .from("models")
    .select("*", { count: "exact" })
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch model training details");
  }

  return data
}
