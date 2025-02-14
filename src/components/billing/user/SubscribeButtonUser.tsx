'use client'
import { TGetSubscription } from "@/lib/supabase/queries";
import { BillingPlanCategory } from "./UserBillingPlans";
import { TGetProductsNonNull } from "./UserPricingDetails";
import { Button } from "@/components/ui/button";

interface ISubscribeButtonUserProps {
  subscription: TGetSubscription;
  mostPopularProduct:BillingPlanCategory
  product: TGetProductsNonNull[number]
}

export default function  SubscribeButtonUser({
  subscription,
  mostPopularProduct,
  product
}: ISubscribeButtonUserProps) {
  
  if (!subscription) {
    return <Button className="">Subscribe button which redirects to stripe checkout</Button>
  }

  return <Button>Already subscribed button/ Upgrade button</Button>;
}

// 1.User has active subscription
// 2.User has no active subscription
// 3. HomePage
