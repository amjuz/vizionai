"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useId } from "react";
import { deleteModel } from "@/app/actions/model-actions";
import { Database } from "@/types/database.types";

const ModelListAlertDialog = ({
  data,
}: {
  data: Database["public"]["Tables"]["models"]["Row"];
}) => {
  const toastId = useId();
  const handleDeleteModel = async (
    id: number,
    model_id: string,
    model_version?: string,
  ) => {
    toast.loading("Deleting Model", { id: toastId });

    const { error, success } = await deleteModel(id, model_id, model_version ?? null);

    if (error || !success) {
      toast.error("Failed to delete model, Please try again!", { id: toastId });
      return;
    }
    toast.success("Model deleted successfully!", { id: toastId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-8 h-8 text-destructive/90 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Model</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete t his model? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              handleDeleteModel(
                data.id,
                data.model_id ?? ""
              )
            }
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelListAlertDialog;
