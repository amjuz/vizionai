import { getProducts } from "@/lib/supabase/queries";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import BillingPlans from "../landing-page/BillingPlan";

// interface IPricingSheetProps {
//   subscription?: TGetSubscription;
//   user?: TGetUserAuth;
//   products?: TGetProducts;
// }

export default async function PricingSheet() {
  const supabase = await createClient();
  const products = await getProducts(supabase);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Upgrade</Button>
      </SheetTrigger>
      <SheetContent className={cn("h-[calc(100vh-20%)]")} side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Choose subscription plan</SheetTitle>
          <SheetDescription>
            Choose a plan that fits your need and budget to continue using
            service
          </SheetDescription>
          <BillingPlans products={products} pageType="profile" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
