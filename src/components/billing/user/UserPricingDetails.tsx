"use client";

import { TGetProducts, TGetSubscription } from "@/lib/supabase/queries";
import { useBillingInterval } from "@/provider/BillingContextProvider";
import SubscribeButtonUser from "./SubscribeButtonUser";
import { BillingPlanCategory } from "./UserBillingPlans";
import { Badge } from "@/components/ui/badge";

export type TGetProductsNonNull = Exclude<TGetProducts, null>;

interface IUserPricingDetailsProps {
  subscription: TGetSubscription;
  product: TGetProductsNonNull[number];
  mostPopularProduct: BillingPlanCategory;
}
export default function UserPricingDetails({
  subscription,
  product,
  mostPopularProduct,
}: IUserPricingDetailsProps) {
  const { billingInterval } = useBillingInterval();

  if (!product) return null;

  const price = product.prices.find(
    (price) => price.interval === billingInterval
  );

  if (!price) return null;
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency!,
    minimumFractionDigits: 0,
  }).format((price.unit_amount ?? 0) / 100);

  return (
    <div className="p-6 ">
      <h2 className="text-2xl leading-6 text-foreground font-semibold flex items-center justify-between">
        {product.name}
        {product.name?.toLowerCase() === mostPopularProduct.toLowerCase() ? (
          <Badge className="border-border font-semibold">Most Popular</Badge>
        ) : null}
      </h2>
      <p className="text-muted-foreground mt-4 text-sm">
        {product.description}
      </p>
      <p className="mt-8">
        <span className="text-4xl font-extrabold text-foreground">
          {priceString}
        </span>
        <span className="text-base font-medium text-muted-foreground">
          /{billingInterval}
        </span>
      </p>
      <SubscribeButtonUser
        mostPopularProduct={mostPopularProduct}
        product={product}
        subscription={subscription}
      />
    </div>
  );
}
