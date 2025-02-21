import { TGetUserAuth } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { DbClient } from "@/types";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getModelCount({ user }: { user: TGetUserAuth }, client?: SupabaseClient) {
  const supabase = client ?? await createClient();
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

export async function fetchModelDto(supabase:DbClient) {
  
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        data: null,
        error: "Authentication failed!",
        success: false,
      };
    }
  
    const { data, error } = await supabase
      .from("models")
      .select("*", { count: "exact" })
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
  
    if (error) {
      return {
        data: null,
        error: "Failed to fetch models data",
        success: false,
      };
    }
  
    return {
      data,
      error,
      success: true,
    };
  }
  