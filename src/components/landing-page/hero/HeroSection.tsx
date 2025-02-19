import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MarqueeColumn } from "./MarqueeColumn";

const avatars = [
  {
    src: "/avatars/AutumnTechFocus.jpeg",
    fallback: "CN",
  },
  {
    src: "/avatars/Casual Creative Professional.jpeg",
    fallback: "AB",
  },
  {
    src: "/avatars/Golden Hour Contemplation.jpeg",
    fallback: "FG",
  },
  {
    src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
    fallback: "PW",
  },
  {
    src: "/avatars/Radiant Comfort.jpeg",
    fallback: "RC",
  },
  {
    src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
    fallback: "RB",
  },
];

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
        <div className="flex items-center space-x-2 mb-4">
          <div className=" flex items-center -space-x-5 sm:-space-x-4 overflow-hidden">
            {avatars.map((avatar, i) => {
              return (
                <Avatar
                  key={i}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage
                    src={avatar.src}
                    className="h-full object-cover"
                  />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              );
            })}
          </div>
          <span className="text-sm font-medium">Loved by 1k+ customers</span>
        </div>
        <Link
          href={"/auth/signin"}
          className={cn(
            "",
            buttonVariants({ className: "rounded-md text-base h-12" })
          )}
        >
          🌟 Create your first AI model 🌟
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
