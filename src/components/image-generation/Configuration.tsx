"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useGeneratedStore } from "@/store/useGeneratedStore";
import { Tables } from "@/types/database.types";

export type TImageGenerationValidator = z.infer<
  typeof ImageGenerationValidator
>;

// const modelType = [
//   "black-forest-labs/flux-dev",
//   "black-forest-labs/flux-schnell",
// ] as const;

export const ImageGenerationValidator = z.object({
  model: z.string({ required_error: "Model is required!" }),
  // enum(modelType, { required_error: "Model is required field" }),
  prompt: z
    .string({
      required_error: "Prompt is required!",
    })
    .min(8, { message: "Prompt too short" })
    .max(1000, {
      message: "Prompt too long",
    }),
  guidance: z
    .number({
      required_error: "Guidance scale is required!",
    })
    .max(10, { message: "Guidance scale cannot exceed 10" })
    .min(0, { message: "Guidance scale cannot be less than 0" }),
  num_of_outputs: z
    .number()
    .min(1, { message: "Number of outputs should be at least 1." })
    .max(4, { message: "Number of outputs must be less than 4" }),
  aspect_ratio: z.string({ required_error: "Aspect ratio is required!" }),
  output_format: z.string({
    required_error: "Output format is required!",
  }),
  output_quality: z
    .number()
    .min(1, { message: "Output quality should be atleast 1." })
    .max(100, { message: "Output quality must be less than or equal to 100" }),
  num_inference_steps: z
    .number()
    .min(1, { message: "Number of inference steps should be atleast 1," })
    .max(50, {
      message: "Number of inference steps must be less than  or equal to 50.",
    }),
});

interface IConfiguration {
  userModels: Tables<"models">[];
  modelId?: string;
}

const Configuration = ({ modelId, userModels }: IConfiguration) => {
  const generateImage = useGeneratedStore((state) => state.generateImage);
  // const loading = useGeneratedStore(state=> state.loading)

  const form = useForm<TImageGenerationValidator>({
    resolver: zodResolver(ImageGenerationValidator),
    defaultValues: {
      aspect_ratio: "1:1",
      guidance: 3.5,
      model: modelId ? `amjuz/${modelId}` : "black-forest-labs/flux-schnell",
      num_of_outputs: 1,
      output_format: "jpg",
      output_quality: 80,
      prompt: "",
      num_inference_steps: 4,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;

        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }

        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
      return () => subscription.unsubscribe();
    });
  }, [form]);

  async function onSubmit(values: TImageGenerationValidator) {
    // console.log(values);
    const newValues = {
      ...values,
      prompt: values.model.startsWith("amjuz/")
        ? (() => {
            const modelId = values.model.replace("amjuz/", "").split(":")[0];
            const selectedModel = userModels.find(
              (model) => model.model_id === modelId,
            );
            return `photo of a ${selectedModel?.trigger_word || "ohwx"} ${
              selectedModel?.gender
            }, ${values.prompt}`;
          })()
        : values.prompt,
    };
    await generateImage(newValues);
  }
  // form.watch("num_of_outputs");
  // console.log(form.getValues("num_of_outputs"));
  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="grid gap-6 rounded-lg border bg-background p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Model
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You can choose any model from the drop down menu</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="black-forest-labs/flux-dev">
                        Flux Dev
                      </SelectItem>
                      <SelectItem value="black-forest-labs/flux-schnell">
                        Flux Schnell
                      </SelectItem>
                      {userModels.map(
                        (model) =>
                          model.training_status === "succeeded" && (
                            <SelectItem
                              value={`amjuz/${model.model_id}:${model.version}`}
                              key={model.id}
                            >
                              {model.model_name}
                            </SelectItem>
                          ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <FormField
                control={form.control}
                name="aspect_ratio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Aspect ratio
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aspect ratio for the generated image</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select aspect ratio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1:1">1:1</SelectItem>
                        <SelectItem value="16:9">16:9</SelectItem>
                        <SelectItem value="9:16">9:16</SelectItem>
                        <SelectItem value="21:9">21:9</SelectItem>
                        <SelectItem value="9:21">9:21</SelectItem>
                        <SelectItem value="4:5">4:5</SelectItem>
                        <SelectItem value="5:4">5:4</SelectItem>
                        <SelectItem value="4:3">4:3</SelectItem>
                        <SelectItem value="3:4">3:4</SelectItem>
                        <SelectItem value="2:3">2:3</SelectItem>
                        <SelectItem value="3:2">3:2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="num_of_outputs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Number of outputs
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total number of output images</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="guidance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                      Guidance
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Guidance for generated images</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={0}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_inference_steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      Number of inference steps
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Number of denoising steps. Recommended range is 28 -
                            50 for dev model and 1 - 4 for schnell model.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={1}
                      max={
                        form.watch("model") === "black-forest-labs/flux-schnell"
                          ? 4
                          : 50
                      }
                      step={0.5}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="output_quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      Output Quality
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Quality when sabing the output image, from 0 to 100.
                            0 is lowest quality , 100 is best quality,
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="output_format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      Output format
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Format of the output image</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an output format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      Prompt
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Prompt for generated images</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="font-medium">
              Generate
            </Button>
          </fieldset>
        </form>
      </Form>
    </TooltipProvider>
  );
};

export default Configuration;
