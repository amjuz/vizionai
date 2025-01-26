import { generateImageAction, storeImages } from "@/app/actions/image-action";
import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import { toast } from "sonner";
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

    const toastId = toast.loading("Generating image...");

    try {
      const { data, error, success } = await generateImageAction(values);
      console.log({ data, error, success });

      if (!success) {
        set({ error, loading: false });
      }

      const newData: string[] = data as string[];

      const dataWithUrl = newData.map((url) => {
        return {
          url,
          ...values,
        };
      });

      set({ images: dataWithUrl, loading: false });

      toast.success("Image generation successful!", { id: toastId });
      
      await storeImages(dataWithUrl);
      toast.success("Image stored Successfully!", { id: toastId });
    } catch (e) {
      console.log(e);

      set({
        error: "Failed to generate image. Please try again.",
        loading: false,
      });
    }
  },
}));
