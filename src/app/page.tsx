import Navigation from "@/components/landing-page/Navigation";
import PricingHomePage from "@/components/landing-page/PricingHomePage";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation/>
      <PricingHomePage />
    </main>
  );
}
