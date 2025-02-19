import { getCredits } from "@/app/actions/credit-action";
import {
  getImageCount,
} from "@/app/actions/image-action";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  ImageIcon,
  LayersIcon,
  Wallet,
  ZapIcon,
} from "lucide-react";
import { TGetUserAuth } from "@/lib/supabase/queries";
import { getModelCount } from "@/app/actions/model-actions";

interface IStatusCards {
  user: TGetUserAuth;
}
export default async function StatusCards({ user }: IStatusCards) {
  const [imageCount, modelCount, { data: creditsData }] = await Promise.all([
    getImageCount({ user }),
    getModelCount({ user }),
    getCredits(),
  ]);

  return (
    <div className="grid grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium">Total Images</CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{imageCount}</div>
          <p className="text-xs text-muted-foreground">
            Image generated so far
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium">Total Models</CardTitle>
          <LayersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{modelCount ?? 0}</div>
          <p className="text-xs text-muted-foreground">Custom model trained</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium">Image Credits</CardTitle>
          <ZapIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {creditsData?.image_generation_count}/
            {creditsData?.max_image_generation_count}
          </div>
          <p className="text-xs text-muted-foreground">
            Available generation credits
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium">
            Training Credits
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {creditsData?.model_training_count}/
            {creditsData?.max_model_training_count}
          </div>
          <p className="text-xs text-muted-foreground">
            Available training credits
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
