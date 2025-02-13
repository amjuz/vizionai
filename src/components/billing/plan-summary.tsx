import { TGetSubscription } from "@/lib/supabase/queries";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import PricingSheet from "./PricingSheet";

// interface ProductsWithPrice extends Product {
//     products: Price[]
// }

// interface PriceWithProducts extends Price {
//     products: Product | null
// }

// interface SubscriptionWithProduct extends Subscription {
//     Prices: PriceWithProducts | null
// }

interface IBillingPlanSummaryProps {
  subscription: TGetSubscription;
}
export default function BillingPlanSummary({
  subscription,
}: IBillingPlanSummaryProps) {
  if (!subscription || subscription.status !== "active") {
    return (
      <Card className="max-w-5xl">
        <CardContent className="px-5 py-4">
          <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
            <span>Plan Summary</span>
            <Badge variant={"secondary"} className="bg-primary/10">
              No Plan
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

            <div className="col-span-full flex flex-col ">
              Please upgrade to continue using the app.
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-border py-3 px-4 border-t">
          <span className="flex ml-auto flex-row">
            <PricingSheet />
          </span>
        </CardFooter>
      </Card>
    );
  }
}
