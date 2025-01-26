"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ImageProps } from "./GalleryComponent";
import Image from "next/image";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import DeleteImageComponent from "./DeleteImageComponent";

interface ImageDialogProps {
  image: ImageProps;
  onClose: () => void;
}
function ImageDialog({ image, onClose }: ImageDialogProps) {
  const handleDownload = () => {
    fetch(image.url || "")
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "Download",
          `generated-image-${Date.now()}.${image.output_format}`
        );
        document.body.appendChild(link);
        link.click();

        // clean up

        link.parentNode?.removeChild(link);
      }).catch(error => console.log(error) )
  }
  return (
    <Sheet open onOpenChange={onClose}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="max-w-full sm:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle className="text-2xl w-full">Image Details</SheetTitle>
          <ScrollArea className="flex flex-col h-[100vh]">
            <div className="relative w-fit h-fit">
              <Image
                className="w-full h-auto flex mb-3 rounded"
                src={image.url}
                alt={image.prompt ?? ""}
                width={image.width || 0}
                height={image.width || 0}
              />
              <div className="flex gap-4 absolute bottom-4 right-4">
                <Button className="w-fit" onClick={ handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <DeleteImageComponent imageId={image.id} onDelete={onClose} imageName={image.image_name}/>
              </div>
            </div>
            <hr className="inline-block w-full border-primary/ mb-2" />
            <p className="text-primary/90 flex flex-col">
              <span className="text-primary text-xl font-semibold">Prompt</span>
              {image.prompt}
            </p>
            <hr className="inline-block w-full border-primary/ my-3" />

            <div className="flex flex-wrap gap-3 mb-32">
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Model ID :
                </span>
                {image.model}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Aspect Ratio :
                </span>
                {image.aspect_ratio}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Dimensions :{" "}
                </span>
                {image.width}x{image.height}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Guidance :
                </span>
                {image.guidance}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Number of Inference steps
                </span>
                {image.num_inference_steps}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Output Format :
                </span>
                {image.output_format}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="text-primary font-semibold uppercase mr-2">
                  Created At :
                </span>
                {new Date(image.created_at).toLocaleDateString()}
              </Badge>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ImageDialog;
