import { generateImageAction, storeImages } from "@/app/actions/image-action";
import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import { toast } from "react-hot-toast";
import { create } from "zustand";

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (values: TImageGenerationValidator) => Promise<void>;
}

export const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: TImageGenerationValidator) => {
    set({ loading: true, error: null });

    const toastId = "generatedImageToastId";
    toast.loading("Generating image...", { id: toastId });

    try {
      const { data, error, success } = await generateImageAction(values);

      if (!success) {
        set({ error, loading: false });
        toast.error(`${error}`, { id: toastId });
        return
      }

      const newData: string[] = data as string[];

      const dataWithUrl = newData.map((url) => {
        return {
          url,
          ...values,
        };
      });

      set({ images: dataWithUrl, loading: false, error: error });

      toast.success("Image generation successful!", { id: toastId });

      await storeImages(dataWithUrl);
      toast.success("Image stored Successfully!");
    } catch (e) {
      console.log("Failed to generate image");

      set({
        error: "Failed to generate image. Please try again.",
        loading: false,
      });
      toast.error(`${e}`, { id: toastId });
    }
  },
}));
