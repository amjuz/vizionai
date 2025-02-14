import Link from "next/link";
import {
  BillingPageType,
  BillingPlanCategory,
} from "../landing-page/BillingPlan";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { TGetProductsNonNull } from "../landing-page/PricingDetails";
import { TGetSubscription } from "@/lib/supabase/queries";
import { checkoutWithStripe } from "@/lib/stripe/server";

interface ISubscriptionButtonProps {
  // pageType: BillingPageType;
  product: TGetProductsNonNull[number];
  mostPopularProduct: BillingPlanCategory;
  subscription?: TGetSubscription;
  // price: TGetProductsNonNull[number]["prices"][number];
}

export default function SubscriptionButtonHome({
  // pageType,
  mostPopularProduct,
  product,
  // price,
}: ISubscriptionButtonProps) {
  // if (pageType === "home")
  return (
    <Link
      href={"/auth/signin"}
      className={cn(
        "mt-8 w-full font-semibold",
        buttonVariants({
          variant:
            product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
              ? "default"
              : "secondary",
        })
      )}
    >
      Subscribe{" "}
    </Link>
  );
}
// else {
// if(user && subscription && subscription.prices?.products?.name?.toLowerCase())
// if (user && !subscription) {
//   return (
//     <Button
//       onClick={()=>checkoutWithStripe(price)}
//       className="mt-8 w-full font-semibold"
//     >
//       Subscribe
//     </Button>
// );
// }

// 1.User has active subscription
// 2.User has no active subscription
// 3. HomePage
