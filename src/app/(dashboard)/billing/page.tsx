import UserBillingPlans from "@/components/billing/user/UserBillingPlans";
import UserBillingPlanSummary from "@/components/billing/user/UserBillingPlanSummary";
import { getSubscription } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

const page = async () => {
  const supabase = await createClient();
  const subscription = await getSubscription(supabase);

  return (
    <section className="container mx-auto space-y-8">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
        <p className="text-muted-foreground">
          Manage your Billing and Subscription information
        </p>
      </div>
      <div className="grid gap-10">
        <UserBillingPlanSummary subscription={subscription}/>
        {/* if user is subscribed , show only one card which user has subscribed and show a button which 
        opens the sheet from which they can see all subscription plan */}
        <UserBillingPlans showBillingDetail={false} showBillingSwitch={false}/>
      </div>
    </section>
  );
};

export default page;
