import { TGetUserAuth } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getImageCount({
  user,
  client,
}: {
  user: TGetUserAuth;
  client?: SupabaseClient;
}) {
  const supabase = client ?? (await createClient());

  if (!user) {
    throw new Error("Authentication failed");
  }
  const { data, error } = await supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to fetch model training details");
  }

  return data?.length;
}

export async function getImagesDto({client,limit}:{client: SupabaseClient, limit?: number}) {
  const supabase = client ?? (await createClient());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Authentication failed");
  }

  let query = supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`${error.message}`);
  }

  const imageWithUrl = await Promise.all(
    data.map(
      async (
        image: Database["public"]["Tables"]["generated_images"]["Row"],
      ) => {
        const { data, error } = await supabase.storage
          .from("generated_images_bucket")
          .createSignedUrl(`${user.id}/${image.image_name}`, 3600);

        if (error) {
          console.log(`failed to  create signed url for ${image.id}`);
        }
        return {
          ...image,
          url: data?.signedUrl,
        };
      },
    ),
  );

  if (!imageWithUrl) {
    return null;
  }

  return imageWithUrl;
}
