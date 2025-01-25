"use server";

// import { imageMeta } from "image-meta";
import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database.types";
import Replicate from "replicate";
// import { randomUUID } from "crypto";

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}

export async function generateImageAction(
  input: TImageGenerationValidator
): Promise<ImageResponse> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    useFileOutput: false,
  });

  const modelInput = {
    prompt: input.prompt,
    go_fast: true,
    guidance: input.guidance,
    megapixels: "1",
    num_of_outputs: input.num_of_outputs,
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

    // console.log(output);

    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error) {
    return {
      //@ts-expect-error error happens due to incorrect type inference, need to refactor
      error: error.message | null,
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

type storeImageInput = {
  url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  console.log(data);
  
  // const uploadResults = [];

  // for (const img of data) {
  //   const arrayBuffer = await imgUrlToBlob(img.url);
  //   const { height, width, type } = imageMeta(new Uint8Array(arrayBuffer));

  //   const fileName = `image_${randomUUID()}.${type}`;
  //   const filePath = `${user.id}/${fileName}`;

    // const { data: insertImageResponseData, error: insertImageError } = await supabase.storage.
    //   .from("generated_images")
    //   .insert(data);
  
    //   if(error) {
    //     return
    //   }
    
  // }

}
