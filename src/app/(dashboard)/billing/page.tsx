import UserBillingPlanSummary from "@/components/billing/user/UserBillingPlanSummary";

const page = async () => {
  return (
    <section className="container mx-auto space-y-8">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
        <p className="text-muted-foreground">
          Manage your Billing and Subscription information
        </p>
      </div>
      <div className="grid gap-10">
        <UserBillingPlanSummary />
      </div>
    </section>
  );
};

export default page;
