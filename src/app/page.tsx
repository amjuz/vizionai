import HeroSection from "@/components/landing-page/hero/HeroSection";
import Navigation from "@/components/landing-page/navigation/Navigation";
import PricingHomePage from "@/components/landing-page/PricingHomePage";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation/>
      <HeroSection/>
      <PricingHomePage />
    </main>
  );
}
