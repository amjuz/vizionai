"use server";

import { imageMeta } from "image-meta";
import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import { randomUUID } from "crypto";
import Replicate from "replicate";
import { ActionResponse } from "@/lib/helper/actions";
import { TGeneratedImageID, TGeneratedImageName } from "@/types/index";
import { revalidatePath } from "next/cache";
import { getCredits } from "./credit-action";

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false,
});

export async function generateImageAction(
  input: TImageGenerationValidator,
): Promise<ImageResponse> {
  const { data: credits } = await getCredits();

  if (!credits?.image_generation_count || credits.image_generation_count <= 0) {
    return {
      data: null,
      error: "No credits left, please subscribe",
      success: false,
    };
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return {
      error: "The replicate API token is not set",
      data: null,
      success: false,
    };
  }

  const modelInput = input.model.startsWith("amjuz/")
    ? {
        model: "dev",
        prompt: input.prompt,
        lora_scale: 1,
        guidance: input.guidance,
        num_outputs: input.num_of_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
        extra_lora_scale: 0,
      }
    : {
        prompt: input.prompt,
        go_fast: true,
        guidance: input.guidance,
        megapixels: "1",
        num_outputs: input.num_of_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
      };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, {
      input: modelInput,
    });


    if (!output) {
      return {
        error: "Image generation api error",
        success: false,
        data: output,
      };
    }

    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error) {
    return {
      //@ts-expect-error error happens due to incorrect type inference, need to refactor
      error: error.message || "Failed to fetch response",
      success: false,
      data: null,
    };
  }
}

export async function imgUrlToBlob(url: string) {
  const response = fetch(url);
  const blob = (await response).blob();
  return (await blob).arrayBuffer();
}

type TUploadResults = {
  fileName: string;
  error: string;
  success: boolean;
  data: unknown | null;
};

type storeImageInput = {
  url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  const uploadResults: TUploadResults[] = [];

  for (const img of data) {
    const arrayBuffer = await imgUrlToBlob(img.url);
    const { height, width, type } = imageMeta(new Uint8Array(arrayBuffer));

    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from("generated_images_bucket")
      .upload(filePath, arrayBuffer, {
        contentType: `image/${type}`,
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      uploadResults.push({
        fileName,
        error: `S3 bucket Store Error: ${storageError.message}`,
        success: false,
        data: null,
      });
      continue;
    }

    const { data: dbData, error: dbError } = await supabase
      .from("generated_images")
      .insert({
        user_id: user.id,
        model: img.model,
        aspect_ratio: img.aspect_ratio,
        created_at: img.created_at,
        guidance: img.guidance,
        image_name: fileName,
        num_inference_steps: img.num_inference_steps,
        output_format: img.output_format,
        prompt: img.prompt,
        height,
        width,
      })
      .select();

    if (dbError) {
      uploadResults.push({
        fileName,
        error: `Database Error: ${dbError.message}`,
        success: false,
        data: dbData || null,
      });
    }
  }

  console.log("s3 upload results", uploadResults);

  return {
    error: null,
    success: true,
    data: {
      results: uploadResults,
    },
  };
}

export type TGetImages = Awaited<ReturnType<typeof getImages>>;

export async function getImages(limit?: number) {
  const supabase = await createClient();

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

export async function deleteImageAction(
  id: TGeneratedImageID,
  name: TGeneratedImageName,
): Promise<ActionResponse> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  const { data, error } = await supabase
    .from("generated_images")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(
      `Failed to delete image { id: ${id} } of user :${user.id}`,
      error.message,
    );
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }

  const { error: ErrorRemoveImageFromS3 } = await supabase.storage
    .from("generated_images_bucket")
    .remove([`${user.id}/${name}`]);

  if (ErrorRemoveImageFromS3) {
    console.log(
      `Failed to remove image with name: ${name} of user : ${user.id} from s# bucket`,
    );
  }

  revalidatePath("/gallery");

  return {
    data,
    error: null,
    success: true,
  };
}

