'use server'

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
