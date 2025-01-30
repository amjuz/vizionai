"use client";

import { TrainModelValidator } from "@/lib/validators/modelTraining";
import { TTrainModelValidator } from "@/types/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ModelNameInput from "./form/ModelNameInput";
import GenderInputRadioBox from "./form/GenderInputRadioBox";
import FileUploadInputBox from "./form/FileUploadInputBox";
import { useId } from "react";
import { toast } from "sonner";
import { getPreSignedStorageUrl } from "@/app/actions/model-actions";

export type TModelTrainingForm = {
  form: UseFormReturn<
    {
      modelName: string;
      gender: "male" | "female";
      zipFile?: File;
    },
    undefined
  >;
};

function ModelTrainingForm() {
  const toastId = useId();
  const form = useForm<TTrainModelValidator>({
    resolver: zodResolver(TrainModelValidator),
    defaultValues: {},
  });

  async function onSubmit(values: TTrainModelValidator) {
    toast.loading("Uploading File...", { id: toastId });
    try {
      const data = await getPreSignedStorageUrl(values.zipFile[0].name);
      const url = data?.signedUrlData?.signedUrl;
      // console.log("signed url :", data?.signedUrlData?.signedUrl);

      if (data?.error) {
        toast.error(`Failed to upload data. Please try again!`, {
          id: toastId,
        });
      }

      const urlResponse = await fetch(url ?? "", {
        method: "PUT",
        headers: {
          "content-Type": values.zipFile[0].type,
        },
        body: values.zipFile[0],
      });

      if (!urlResponse.ok) {
        throw new Error("Upload Failed!");
      }

      const res = await urlResponse.json();
      // console.log(res);

      toast.success("File upload successful!", { id: toastId });
      toast.loading("Initiating model training...", { id: "loadingID" });

      const formData = new FormData();
      formData.append("fileKey", res.Key);
      formData.append("modelName", values.modelName);
      formData.append("gender", values.gender);

      const apiResponse = await fetch("/api/train", {
        method: "POST",
        body: formData,
      });

      const apiResponseJson = await apiResponse.json();
      if (!apiResponse.ok || apiResponseJson.error) {
        throw new Error(apiResponseJson.error || "Failed to train model!");
      }

      toast.dismiss("loadingID");
      toast.success(
        "Training started successfully. You will receive a notification once it gets completed",
        { id: toastId }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start training";
      toast.error(errorMessage, { id: toastId, duration: 5000 });
      toast.dismiss("loadingID");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className="grid max-w-5xl bg-background p-8 rounded-lg gap-6 border">
          <ModelNameInput form={form} />
          <GenderInputRadioBox form={form} />
          <FileUploadInputBox form={form} />

          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default ModelTrainingForm;
