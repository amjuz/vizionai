import Features from "@/components/landing-page/features/Features";
import HeroSection from "@/components/landing-page/hero/HeroSection";
import Navigation from "@/components/landing-page/navigation/Navigation";
import PricingHomePage from "@/components/landing-page/PricingHomePage";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navigation />
      <HeroSection />
      <Features />
      <PricingHomePage />
    </main>
  );
}
