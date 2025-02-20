"use client";
import { TGetSubscription } from "@/lib/supabase/queries";
import { TGetProductsNonNull } from "./UserPricingDetails";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe, createStripePortal } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/helper/stripe/helper";
import { getStripe } from "@/lib/stripe/client";
import { toast } from "react-hot-toast";
import { useId } from "react";

interface ISubscribeButtonUserProps {
  subscription: TGetSubscription;
  // mostPopularProduct: BillingPlanCategory;
  product: TGetProductsNonNull[number];
  price: TGetProductsNonNull[number]["prices"][number];
}

export default function SubscribeButtonUser({
  subscription,
  // mostPopularProduct,
  product,
  price,
}: ISubscribeButtonUserProps) {
  const pathName = usePathname();
  const router = useRouter();
  const toastId = useId();

  const subscribedUser =
    subscription?.prices?.products?.name?.toLowerCase() ===
    product.name?.toLowerCase();

  const buttonLabel = (() => {
    if (subscribedUser) {
      return "Manage Subscription";
    } else if(!subscription){
      return "Subscribe"
    }
    return "Switch Plan";
  })();

  async function handleStripeCheckout() {
    toast.loading("Loading...", { id: toastId });
    const { errorRedirect, sessionId } = await checkoutWithStripe(price);

    if (errorRedirect) {
      console.log(errorRedirect);
      return router.push(errorRedirect);
    }
    toast.error("Request failed");
    if (!sessionId) {
      return router.push(
        getErrorRedirect(
          pathName,
          "An unknown error occurred",
          "Please try again later or contact us."
        )
      );
    }
    toast.error("An unknown error occurred", { id: toastId });

    const stripe = await getStripe();
    if (stripe) toast.dismiss(toastId);
    stripe?.redirectToCheckout({ sessionId });
  }

  async function handleStripePortalRequest() {
    toast.loading("Redirecting Stripe Portal...");
    const redirectUrl = await createStripePortal(pathName);
    return router.push(redirectUrl);
  }

  return (
    <Button
      className="mt-8 w-full font-semibold"
      onClick={
        subscribedUser ? handleStripePortalRequest : handleStripeCheckout
      }
    >
      {buttonLabel}
    </Button>
  );
}

// 1.User has active subscription
// 2.User has no active subscription
// 3. HomePage
