import { TGetImages } from "@/app/actions/image-action";
import RecentImagesFallbackCard from "./RecentImagesFallbackCard";
import { Suspense } from "react";
import RecentImagesCarousel from "./RecentImagesCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getImagesDto } from "@/lib/services/dto/image";
import { SupabaseClient } from "@supabase/supabase-js";

interface IRecentImagesProps {
  client: SupabaseClient;
}
export default async function RecentImages({ client }: IRecentImagesProps) {
  const images: TGetImages = await getImagesDto({ client });

  if (!images?.length) {
    return <RecentImagesFallbackCard />;
  }

  return (
    <Card className="col-span-full xl:col-span-3">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<>loading...</>}>
          <RecentImagesCarousel images={images} />
        </Suspense>
        <div className="justify-end overflow-hidden sm:flex">
          <Link
            href={"/gallery"}
            className={cn("", buttonVariants({ variant: "outline" }))}
          >
            View Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
