import { TGetUserAuth } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getCreditsDto({ user, client }: { user: TGetUserAuth , client?: SupabaseClient}) {
  const supabase = client ?? await createClient();

  if (!user) {
    throw new Error("Authentication failed");
  }

  const { data: creditData, error } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return {
      error: error.message,
      data: null,
      success: false,
    };
  }

  return {
    error: null,
    data: creditData,
    success: true,
  };
}
