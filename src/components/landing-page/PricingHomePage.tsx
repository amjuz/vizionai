import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import HomeBillingPlans from "../billing/home/HomeBillingPlan";

export default async function PricingHomePage() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-muted">
      <div className="container mx-auto flex w-full flex-col items-center justify-center space-y-8 py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Pricing
            </span>
          </AnimatedGradientText>
          <h1 className="mt-4 text-4xl font-bold capitalize">
            Choose the plan that fits your needs
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground">
            Choose an affordable plan that is packed with the best features for
            engaging your audience, creating customer loyalty and driving sales.
          </p>
        </div>
        <HomeBillingPlans />
      </div>
    </section>
  );
}
