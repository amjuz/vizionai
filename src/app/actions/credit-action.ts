"use server";

import { createClient } from "@/lib/supabase/server";
import { Table } from "@/types";

interface CreditResponse {
  error: null | string;
  success: boolean;
  data: Table["credits"]["Row"] | null;
}

export async function getCredits(): Promise<CreditResponse> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "Auth Error",
      success: false,
    };
  }

  const { data: creditData, error} = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

    if(error){
        return {
            error: error.message,
            data: null,
            success: false
        }
    }

    return {
        error: null,
        data: creditData,
        success: true
    }
}
