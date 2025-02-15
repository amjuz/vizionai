"use client";
import { TGetSubscription } from "@/lib/supabase/queries";
import { BillingPlanCategory } from "./UserBillingPlans";
import { TGetProductsNonNull } from "./UserPricingDetails";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/helper/stripe/helper";
import { getStripe } from "@/lib/stripe/client";
import { toast } from "sonner";
import { useId } from "react";

interface ISubscribeButtonUserProps {
  subscription: TGetSubscription;
  mostPopularProduct: BillingPlanCategory;
  product: TGetProductsNonNull[number];
  price: TGetProductsNonNull[number]['prices'][number]
}

export default function SubscribeButtonUser({
  subscription,
  mostPopularProduct,
  product,
  price
}: ISubscribeButtonUserProps) {

  const pathName= usePathname()
  const router = useRouter()
  const toastId = useId()

  if (!subscription) {

    async function handleStripeCheckout() {
      toast.loading("Loading...",{id:toastId})
      const {errorRedirect,sessionId} = await checkoutWithStripe(price)

      if(errorRedirect){
        console.log(errorRedirect);
        return router.push(errorRedirect)
      }
      toast.error("Request failed")
      if(!sessionId) {
        return router.push(getErrorRedirect(pathName,"An unknown error occurred", "Please try again later or contact us."))
      }
      toast.error("An unknown error occurred",{id:toastId})
      
      const stripe = await getStripe()
      if(stripe) toast.dismiss(toastId)
      stripe?.redirectToCheckout({sessionId})

    }
    return (
      <Button className="mt-8 w-full font-semibold" onClick={handleStripeCheckout}>
        Subscribe button which redirects to stripe checkout
      </Button>
    );
  }

  return (
    <Button className="mt-8 w-full font-semibold">
      Already subscribed button Upgrade button
    </Button>
  );
}

// 1.User has active subscription
// 2.User has no active subscription
// 3. HomePage
