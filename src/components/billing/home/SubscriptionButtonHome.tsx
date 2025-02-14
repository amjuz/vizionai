import Link from "next/link";
import { cn } from "@/lib/utils";
import { TGetProductsNonNull } from "@/components/landing-page/PricingDetails";
import { buttonVariants } from "@/components/ui/button";
import { BillingPlanCategory } from "./HomeBillingPlan";

interface ISubscriptionButtonProps {
  product: TGetProductsNonNull[number];
  mostPopularProduct: BillingPlanCategory;
}

export default function SubscriptionButtonHome({
  mostPopularProduct,
  product,
}: ISubscriptionButtonProps) {
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
