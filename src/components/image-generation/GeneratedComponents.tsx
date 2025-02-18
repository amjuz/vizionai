'use client'

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGeneratedStore } from "@/store/useGeneratedStore";
import Image from "next/image";

function GeneratedComponents() {

  const images: Array<{url:string}> = useGeneratedStore(state=> state.images)

  if (images.length === 0) {
    return (
      <Card className="w-full max-w-2xl bg-muted">
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-2xl">No Images Generated</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative p-1 flex items-center justify-center rounded-lg overflow-hidden aspect-square">
              <Image
                src={image?.url ?? ''}
                alt={'ai generated images'}
                fill
                className="w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default GeneratedComponents;
