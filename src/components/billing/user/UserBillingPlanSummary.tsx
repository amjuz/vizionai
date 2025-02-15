import { Card, CardContent, CardFooter } from "../../ui/card";
import PricingSheetUserBillingPage from "./PricingSheetUserBillingPage";
import { getSubscription } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import PricingSheetUserBillingPageCardContent from "./PricingSheetUserBillingPageCardContent";
import PricingSheetUserBillingPageCardContentWithSubscription from "./PricingSheetUserBillingPageCardContentWithSubscription";

// interface IUserBillingPlanSummaryProps {}
export default async function UserBillingPlanSummary() {
  const supabase = await createClient();
  const subscription = await getSubscription(supabase);

  if (!subscription|| subscription.status === 'active') {
    console.log('ran');
    
    return (
      <Card className="max-w-5xl">
        <CardContent>
          <PricingSheetUserBillingPageCardContent />
        </CardContent>
        <CardFooter className="border-border py-3 px-4 border-t">
          <span className="flex ml-auto flex-row">
            <PricingSheetUserBillingPage />
          </span>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-5xl">
      <CardContent>
        <PricingSheetUserBillingPageCardContentWithSubscription
          subscription={subscription}
        />
      </CardContent> 
      {/* <CardFooter className="border-border py-3 px-4 border-t">
        <span className="flex ml-auto flex-row">
          <PricingSheetUserBillingPage />
        </span>
      </CardFooter> */}
    </Card>
  );
}
