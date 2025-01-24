import { generateImageAction } from "@/app/actions/image-action";
import { TImageGenerationValidator } from "@/components/image-generation/Configuration";
import { create } from "zustand";

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }> ;
  error: string | null;
  generateImage: (values: TImageGenerationValidator) => Promise<void>;
}

export const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: TImageGenerationValidator) => {
    set({ loading: true, error: null });

    try {
      const { data, error, success } = await generateImageAction(values);
      console.log({data,error,success});
      
      if (!success) {
        set({ error, loading: false });
      }

      const newData: string[] = data as string[]

      const dataWithUrl = newData.map(url=> {
        return {
          url
        }
      })

      set({ images: dataWithUrl, loading: false });
    } catch (e) {
      console.log(e);
      
      console.error(e);
      set({
        error: "Failed to generate image. Please try again.",
        loading: false,
      });
    }
  },
}));
