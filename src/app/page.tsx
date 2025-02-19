import Faq from "@/components/landing-page/faqs/Faq";
import Features from "@/components/landing-page/features/Features";
import HeroSection from "@/components/landing-page/hero/HeroSection";
import Navigation from "@/components/landing-page/navigation/Navigation";
import PricingHomePage from "@/components/landing-page/PricingHomePage";
import Testimonials from "@/components/landing-page/testimonials/Testimonials";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navigation />
      <HeroSection />
      <Features />
      <Testimonials/>
      <PricingHomePage />
      <Faq/>
    </main>
  );
}
