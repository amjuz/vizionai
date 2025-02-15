import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TGetSubscription } from "@/lib/supabase/queries";
import { format } from "date-fns";

interface IPricingSheetUserBillingPageCardContentWithSubscription {
  subscription: Exclude<TGetSubscription, null>;
}

export default function PricingSheetUserBillingPageCardContentWithSubscription({
  subscription,
}: IPricingSheetUserBillingPageCardContentWithSubscription) {
  const { products, unit_amount, currency } = subscription?.prices ?? {};

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount ?? 0) / 100);

  return (
    <div className="px-5 py-4">
      <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
        <span>Plan Summary</span>
        <Badge variant={"secondary"} className="bg-primary/10">
          {products?.name ?? "--"} Plan
        </Badge>
      </h3>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-5 flex flex-col pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Image Generation credits left
            </span>
            <span className="font-medium">0 remaining</span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress value={0} className="w-full h-2" />
          </div>
        </div>

        <div className="col-span-5 flex flex-col pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Model Training credits left
            </span>
            <span className="font-medium">0 remaining</span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress value={0} className="w-full h-2" />
          </div>
        </div>

        <div className="col-span-3 flex flex-row justify-between flex-wrap ">
          <div className="flex flex-col pb-0">
            <div className="text-sm font-normal">Price/Month</div>
            <div className="flex-1 pt-1 text-sm font-medium">{priceString}</div>
          </div>

          <div className="flex flex-col pb-0">
            <div className="text-sm font-normal">Included Credits</div>
            <div className="flex-1 pt-1 text-sm font-medium">0 credits</div>
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
