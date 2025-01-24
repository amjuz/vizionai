"use server";

import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import Replicate from "replicate";

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


// export async function storeImage(data) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return {
//       error: "Unauthorized",
//       success: false,
//       data: null,
//     };
//   }
// }
