"use server";

import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function getPreSignedStorageUrl(filePath: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(`Auth error : ${error}`);
    return;
  }

  const { data: signedUrlData, error: signedUrlError } =
    await supabaseAdminClient.storage
      .from("training_data_bucket")
      .createSignedUploadUrl(`${user?.id}/${new Date().getTime()}_${filePath}`);

  return {
    signedUrlData,
    error: signedUrlError?.message || null,
  };
}

export async function fetchModel() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  // handle user auth
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
