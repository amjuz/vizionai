import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { getProducts } from "@/lib/supabase/queries";
import PricingDetails from "../../landing-page/PricingDetails";
import PricingDetailsDescription from "../../landing-page/PricingDetailsDescription";
import BillingSwitcher from "../BillingSwitcher";
import { createClient } from "@/lib/supabase/server";

export type BillingPlanCategory = "pro" | "hobby" | "enterprice";

interface IBillingProps {
  // products: TGetProducts;
  mostPopularProduct?: BillingPlanCategory;
}

export default async function HomeBillingPlans({
  mostPopularProduct = "pro",
}: IBillingProps) {
  const supabase = await createClient();
  const products = await getProducts(supabase);
  return (
    <div className="">
      <div className="flex items-center justify-center space-x-4 py-8">
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Monthly
        </Label>
        <BillingSwitcher />
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Yearly
        </Label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center mx-auto gap-y-8 sm:gap-8 lg:max-w-4xl xl:max-w-none ">
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
                  mostPopularProduct={mostPopularProduct}
                />

                <PricingDetailsDescription product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
