"use client";

import { Tables } from "@/types/database.types";
import Image from "next/image";
import ImageDialog from "./ImageDialog";
import { useState } from "react";

export type ImageProps = {
  url: string;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}
function GalleryComponent({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
        No images found!
      </div>
    );
  }
  return (
    <section className="container mx-auto py-8">
      <div className="columns-4 g-4 space-y-4">
        {images.map((item, index) => (
          <div key={index}>
            <div
              className="group relative overflow-hidden cursor-pointer transition-transform"
              onClick={() => {
                setSelectedImage(item);
              }}
            >
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70">
                <div className="flex items-center justify-center h-full">
                  <p className="text-primary-foreground text-lg font-semibold">
                    View details
                  </p>
                </div>
              </div>
              <Image
                src={item.url}
                alt={item.prompt ?? ""}
                width={item.width || 0}
                height={item.width || 0}
              />
            </div>
          </div>
        ))}
      </div>
      {selectedImage && <ImageDialog image={selectedImage} onClose={()=>setSelectedImage(null)}/>}
      
    </section>
  );
}
export default GalleryComponent;
