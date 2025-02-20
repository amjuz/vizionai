import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import {
  getProducts,
  getSubscription,
} from "@/lib/supabase/queries";
// import PricingDetailsDescription from "./PricingDetailsDescription";
// import BillingSwitcher from "../billing/BillingSwitcher";
import { createClient } from "@/lib/supabase/server";
import UserPricingDetails from "./UserPricingDetails";
import BillingSwitcher from "../BillingSwitcher";
import PricingDetailsDescription from "@/components/landing-page/PricingDetailsDescription";

export type BillingPlanCategory = "pro" | "hobby" | "enterprice";
export type BillingPageType = "profile" | "home";

interface IUserBillingPlans {
  mostPopularProduct?: BillingPlanCategory;
  showBillingSwitch?: boolean;
  showBillingDetail?: boolean;
}

export default async function UserBillingPlans({
  showBillingDetail = true,
  showBillingSwitch = true,
  mostPopularProduct = "pro",
}: IUserBillingPlans) {
  const supabase = await createClient();
  const products = await getProducts(supabase);
  const subscription = await getSubscription(supabase);

  return (
    <div className="">
      {showBillingSwitch ? (
        <div className="flex items-center justify-center space-x-4 py-8">
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Monthly
          </Label>
          <BillingSwitcher />
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Yearly
          </Label>
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center xl:grid xl:grid-cols-3 place-items-center mx-auto gap-8 ">
        {products &&
          products.map((product) => {
            return (
              <div
                className={cn(
                  "border bg-background rounded-xl shadow-sm h-fit divide-border divide-y w-full",
                  // product.name?.toLowerCase() ===
                  //   mostPopularProduct.toLowerCase()
                  //   ? "border-primary bg-background drop-shadow-md scale-105"
                  //   : "border-border"
                )}
                key={product.id}
              >
                <UserPricingDetails
                  product={product}
                  mostPopularProduct={mostPopularProduct}
                  subscription={subscription}
                />
                {showBillingDetail ? (
                  <PricingDetailsDescription product={product} />
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}

// function ShowSubscribedCard({ products }: { products: TGetProducts }) {
//   return (
//     <div className="">
//       {products &&
//         products.map((product) => {
//           return (
//             <div
//               className={cn(
//                 "border bg-background rounded-xl shadow-sm h-fit divide-border  divide-y",
//                 // product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
//                 //   ? "border-primary bg-background drop-shadow-md scale-105"
//                 //   : "border-border"
//               )}
//               key={product.id}
//             >
//               <UserPricingDetails
//                 product={product}
//                 mostPopularProduct={mostPopularProduct}
//                 subscription={subscription}
//               />
//               {showBillingDetail ? (
//                 <PricingDetailsDescription product={product} />
//               ) : null}
//             </div>
//           );
//         })}
//     </div>
//   );
// }
