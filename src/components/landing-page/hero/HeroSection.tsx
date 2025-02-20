import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MarqueeColumn } from "./MarqueeColumn";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import AvatarSocials from "./AvatarSocials";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";


export default function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-fit px-6 xs:px-8 sm:px-0 mx-auto flex flex-col justify-center items-center space-y-4 text-center z-40 backdrop-blur-[2px]">
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Try new flux model
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Transform Your photos with the power of AI
        </h1>
        <p className="mx-auto max-w-3xl text-sm xs:text-base sm:text-lg md:text-xl mb-8 text-gray-600">
          {" "}
          From LinkedIn headshots to Instagram influencer photos, Pictoria
          AI&apos;s state-of-the-art technology ensures you always look your
          best. Create, edit, and generate images effortlessly.
        </p>
        <AvatarSocials/>
        <Link href={"/auth/signin"}>
          <InteractiveHoverButton
            className="rounded-md"
            // borderRadius="0.3rem"
            // shimmerSize="2px"
          >
             Create your first AI model 
          </InteractiveHoverButton>
        </Link>
      </div>
      <div className="absolute top-0 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 z-10">
        <MarqueeColumn reverse={false} duration="120s" />
        <MarqueeColumn reverse duration="120s" />
        <MarqueeColumn reverse={false} duration="120s" />
        <MarqueeColumn className="hidden md:flex" reverse duration="120s" />
        <MarqueeColumn
          className="hidden lg:flex"
          reverse={false}
          duration="120s"
        />
        <MarqueeColumn className="hidden lg:flex" reverse duration="120s" />
      </div>
    </section>
  );
}
