import { TGetImages } from "@/app/actions/image-action";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface IRecentImagesCarouselProps {
  images: TGetImages;
}
export default function RecentImagesCarousel({
  images,
}: IRecentImagesCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images?.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="space-y-2">
              <div
                className={cn(
                  "overflow-hidden rounded-lg aspect-square"
                  // item.height && item.width
                  //   ? `aspect-[${item.width}/${item.height}]`
                  //   : "aspect-square"
                )}
              >
                <Image
                  src={item.url ?? ""}
                  alt={item.prompt ?? ""}
                  width={720}
                  height={480}
                  className="object-cover h-full"
                />
              </div>
              <p className="text-muted-foreground  text-lg font-semibold line-clamp-2">{item.prompt}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2"/>
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
