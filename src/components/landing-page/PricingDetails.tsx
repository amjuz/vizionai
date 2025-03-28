"use client";

import { TGetProducts } from "@/lib/supabase/queries";
import { Badge } from "../ui/badge";
import { BillingPlanCategory } from "../billing/home/HomeBillingPlan";
import { useBillingInterval } from "@/provider/BillingContextProvider";
import SubscriptionButtonHome from "../billing/home/SubscriptionButtonHome";

export type TGetProductsNonNull = Exclude<TGetProducts, null>;

interface IPricingDetailsProps {
  product: TGetProductsNonNull[number];
  mostPopularProduct: BillingPlanCategory;
}
export default function PricingDetails({
  product,
  mostPopularProduct,
}: IPricingDetailsProps) {
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
  }).format((price.unit_amount || 0) / 100);

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
      <SubscriptionButtonHome
        mostPopularProduct={mostPopularProduct}
        product={product}
      />
    </div>
  );
}
