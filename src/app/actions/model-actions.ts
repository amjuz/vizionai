"use server";

import { supabaseAdminClient } from "@/lib/supabase/admin";
import { TGetUserAuth } from "@/lib/supabase/queries";
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

export async function deleteModel(
  id: number,
  model_id: string,
  model_version: string | null
) {
  // console.log("version", model_version);
  // console.log("id", model_id);

  const supabase = await createClient();

  if (model_version) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/amjuz/${model_id}/versions/${model_version}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        // throw new Error("Failed to delete model version from Replicate");

        console.log("replicate api failed", await res.json());
        return {
          error: "Failed to delete model version from replicate",
          success: false,
        };
      }
    } catch (error) {
      console.error("Failed to delete model version from replicate:", error);

      return {
        error: "Failed to delete model version from replicate",
        success: false,
      };
    }
  }

  if (model_id) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/amjuz/${model_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        console.log("replicate api failed", await res.json());
        // throw new Error("Failed to delete model from Replicate");
        return {
          error: "Failed to delete model version from replicate",
          success: false,
        };
      }
    } catch (error) {
      console.log("Failed to delete model from replicate:", error);

      return {
        error: "Failed to delete model from replicate",
        success: false,
      };
    }
  }

  try {
    const { error } = await supabase.from("models").delete().eq("id", id);

    if (error)
      return {
        error: error?.message,
        success: false,
      };

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.log(
      "Failed to delete model from database, Please try again",
      error
    );

    return {
      error: "Failed to delete model version from replicate",
      success: false,
    };
  }
}

export async function getModelCount({ user }: { user: TGetUserAuth }) {
  const supabase = await createClient();
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

export async function getRecentModel({ user }: { user: TGetUserAuth }) {
  const supabase = await createClient();
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
  
  return data;
}
