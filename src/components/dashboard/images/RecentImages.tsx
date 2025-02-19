import { getImages, TGetImages } from "@/app/actions/image-action";
import RecentImagesFallbackCard from "./RecentImagesFallbackCard";
import { Suspense } from "react";
import RecentImagesCarousel from "./RecentImagesCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function RecentImages() {
  const images: TGetImages = await getImages();

  if (!images) {
    return (
      <Suspense fallback={<>loading...</>}>
        <RecentImagesFallbackCard />;
      </Suspense>
    );
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<>loading...</>}>
          <RecentImagesCarousel images={images} />
        </Suspense>
        <div className="flex justify-end">
          <Link
            href={"/gallery"}
            className={cn("", buttonVariants({ variant: "outline" }))}
          >
            View Gallery <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
