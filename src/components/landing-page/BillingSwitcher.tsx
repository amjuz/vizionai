"use client";
import { Label } from "@radix-ui/react-label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Price, Product } from "@/types/index";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Check } from "lucide-react";

export interface ProductsWithPrices extends Product {
  prices: Price[];
}

// @TODO type is given unknown fix this asap ASK Muad
interface IBillingProps {
  products: ProductsWithPrices[];
  mostPopularProduct?: string;
}

export default function BillingSwitcher({
  products,
  mostPopularProduct = "pro",
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
        {products.map((product) => {
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
            <div
              className={cn(
                "border bg-background rounded-xl shadow-sm h-fit divide-border divide-y",
                product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
                  ? "border-primary bg-background drop-shadow-md scale-105"
                  : "border-border"
              )}
              key={product.id}
            >
              <div className="p-6 ">
                <h2 className="text-2xl leading-6 text-foreground font-semibold flex items-center justify-between">
                  {product.name}
                  {product.name?.toLowerCase() ===
                  mostPopularProduct.toLowerCase() ? (
                    <Badge className="border-border font-semibold">
                      Most Popular
                    </Badge>
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
                <Link
                  href={"/auth/signin"}
                  className={cn(
                    "mt-8 w-full font-semibold",
                    buttonVariants({
                      variant:
                        product.name?.toLowerCase() ===
                        mostPopularProduct.toLowerCase()
                          ? "default"
                          : "secondary",
                    })
                  )}
                >
                  Subscribe
                </Link>
              </div>

              <div className="pt-6 px-6 pb-8">
                <h3 className="uppercase text-wide text-foreground font-medium text-sm">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  {Object.values(product.metadata ?? {}).map(
                    (feature, index) => {
                      if (feature) {
                        return (
                          <li key={index} className="flex space-x-3">
                            <Check className="w-5 h-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        );
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
