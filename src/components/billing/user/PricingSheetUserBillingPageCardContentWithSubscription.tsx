import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TGetSubscription } from "@/lib/supabase/queries";
import { Table } from "@/types";
import { format } from "date-fns";

interface IPricingSheetUserBillingPageCardContentWithSubscription {
  subscription: Exclude<TGetSubscription, null>;
  credits: Table["credits"]["Row"];
}

export default function PricingSheetUserBillingPageCardContentWithSubscription({
  credits,
  subscription,
}: IPricingSheetUserBillingPageCardContentWithSubscription) {
  const { products, unit_amount, currency } = subscription?.prices ?? {};

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount ?? 0) / 100);

  const {
    image_generation_count,
    model_training_count,
    max_image_generation_count,
    max_model_training_count,
  } = credits;
  return (
    <div className="md:px-5 py-4 md:pb-1 ">
      <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
        <span>Plan Summary</span>
        <Badge variant={"secondary"} className="bg-primary/10">
          {products?.name ?? "--"} Plan
        </Badge>
      </h3>
      <div className="grid grid-cols-3 xl:grid-cols-8 gap-4">
        <div className="col-span-5 flex flex-col md:pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-semibold text-base">
              {image_generation_count} / {max_image_generation_count}
            </span>
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Image Generation credits
            </span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress
              value={
                (image_generation_count ??
                  0 / (max_image_generation_count ?? 0)) * 100
              }
              className="w-full h-2"
            />
          </div>
        </div>

        <div className="col-span-5 flex flex-col md:pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-semibold">
              {model_training_count} / {max_model_training_count}
            </span>
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Model Training credits left
            </span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress
              value={
                (model_training_count ?? 0 / (max_model_training_count ?? 0)) *
                100
              }
              className="w-full h-2"
            />
          </div>
        </div>

        <div className="col-span-3 flex flex-col justify-center md:flex-row md:justify-between flex-wrap gap-4">
          <div className="flex flex-col pb-0">
            <div className="text-sm font-normal">Price/Month</div>
            <div className="flex-1 pt-1 text-sm font-medium">{priceString}</div>
          </div>

          <div className="flex flex-col pb-0">
            <div className="text-sm font-normal">Included Credits</div>
            <div className="flex-1 pt-1 text-sm font-medium">
              {max_image_generation_count} credits
            </div>
          </div>

          <div className="flex flex-col pb-0">
            <div className="text-sm font-normal">Renewal Date</div>
            <div className="flex-1 pt-1 text-sm font-medium">
              {format(new Date(subscription.current_period_end), "MMM d yyyy")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
