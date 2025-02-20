import { Card, CardContent, CardFooter } from "../../ui/card";
import PricingSheetUserBillingPage from "./PricingSheetUserBillingPage";
import { TGetSubscription } from "@/lib/supabase/queries";
import PricingSheetUserBillingPageCardContent from "./PricingSheetUserBillingPageCardContent";
import PricingSheetUserBillingPageCardContentWithSubscription from "./PricingSheetUserBillingPageCardContentWithSubscription";
import { getCredits } from "@/app/actions/credit-action";

interface IUserBillingPlanSummaryProps {
  subscription: TGetSubscription;
}
export default async function UserBillingPlanSummary({
  subscription,
}: IUserBillingPlanSummaryProps) {
  const { data: credits } = await getCredits();

  if (!subscription || !credits) {
    return (
      <Card className="max-w-5xl">
        <CardContent>
          <PricingSheetUserBillingPageCardContent />
        </CardContent>
        <CardFooter className="border-t border-border px-4 py-3">
          <span className="ml-auto flex flex-row">
            <PricingSheetUserBillingPage />
          </span>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w- 5xl">
      <CardContent>
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
