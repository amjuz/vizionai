"use client";
import { Label } from "@radix-ui/react-label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TGetProducts } from "@/lib/supabase/queries";
import PricingDetails from "./PricingDetails";
import PricingDetailsDescription from "./PricingDetailsDescription";


export type BillingPlanCategory = "pro" | "hobby" | "enterprice";

interface IBillingProps {
  products: TGetProducts;
  mostPopularProduct?: BillingPlanCategory;
  pageType: "profile" | "home";
}

export default function BillingPlans({
  products,
  mostPopularProduct = "pro",
  pageType,
}: IBillingProps) {
  const [billingInterval, setBillingInterval] = useState("month");

  return (
    <div className="">
      <div className="flex items-center justify-center space-x-4 py-8">
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Monthly
        </Label>
        <Switch
          id="pricing-switch"
          checked={billingInterval === "year"}
          onCheckedChange={(checked) =>
            setBillingInterval(checked ? "year" : "month")
          }
        />

        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Yearly
        </Label>
      </div>
      <div className="grid grid-cols-3 place-items-center mx-auto gap-8">
        {products &&
          products.map((product) => {
            return (
              <div
                className={cn(
                  "border bg-background rounded-xl shadow-sm h-fit divide-border divide-y",
                  product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase()
                    ? "border-primary bg-background drop-shadow-md scale-105"
                    : "border-border"
                )}
                key={product.id}
              >
                <PricingDetails
                  product={product}
                  billingInterval={billingInterval}
                  mostPopularProduct={mostPopularProduct}
                />
                {pageType === "home" && (
                  <PricingDetailsDescription product={product} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
