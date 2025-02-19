import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import FaqList from "./FaqList";

export default function Faq() {
  return (
    <section
      id="faqs"
      className="flex w-full flex-col items-center justify-center overflow-hidden border px-6 py-32 xs:px-8 sm:mx-8 sm:px-0 lg:mx-auto"
    >
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          FAQs
        </span>
      </AnimatedGradientText>

      <h2 className="subHeading mt-4"> Frequently Asked Questions</h2>
      <p className="subText mt-4 text-center">
        Here are some of the most frequently asked questions about our product.
      </p>

      <FaqList />
    </section>
  );
}
