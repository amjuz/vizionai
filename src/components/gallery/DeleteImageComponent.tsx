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
import { useId } from "react";
import { toast } from "sonner";
import { deleteImageAction } from "@/app/actions/image-action";
import { TGeneratedImageID, TGeneratedImageName } from "@/types/index";
import { cn } from "@/lib/utils";

interface IDeleteImageComponent {
  imageId: TGeneratedImageID;
  imageName: TGeneratedImageName;
  onDelete?: () => void;
  className?: string;
}
const DeleteImageComponent = ({
  imageId,
  imageName,
  onDelete,
  className,
}: IDeleteImageComponent) => {
  const toastId = useId();

  const handleDelete = async () => {
    toast.loading("Deleting the image...", { id: toastId });
    const { error, data } = await deleteImageAction(imageId, imageName);
    if (error) {
      toast.error(error, { id: toastId });
    }
    toast.success("Image deleted successfully!", { id: toastId });
    onDelete?.();
    console.log("deleted data:", data);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn("w-fit", className)} variant={"destructive"}>
          <Trash2 className="h-4 w-4 "></Trash2>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please confirm your action?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImageComponent;
