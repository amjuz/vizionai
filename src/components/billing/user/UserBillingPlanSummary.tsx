import { Card, CardContent, CardFooter } from "../../ui/card";
import PricingSheetUserBillingPage from "./PricingSheetUserBillingPage";
import { getSubscription } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import PricingSheetUserBillingPageCardContent from "./PricingSheetUserBillingPageCardContent";
import PricingSheetUserBillingPageCardContentWithSubscription from "./PricingSheetUserBillingPageCardContentWithSubscription";
import { getCredits } from "@/app/actions/credit-action";

// interface IUserBillingPlanSummaryProps {}
export default async function UserBillingPlanSummary() {
  const supabase = await createClient();
  const subscription = await getSubscription(supabase);
  const {data: credits} = await getCredits()

  if (!subscription || !credits) {
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
    <Card className="max-w- 5xl">
      <CardContent >
        <PricingSheetUserBillingPageCardContentWithSubscription
          credits={credits}
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
