import BillingPlanSummary from "@/components/billing/plan-summary";
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
        <BillingPlanSummary subscription={subscription} />
      </div>
    </section>
  );
};

export default page;
