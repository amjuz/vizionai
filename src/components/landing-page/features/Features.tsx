import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ImageIcon, Package2, Palette } from "lucide-react";
import Image from "next/image";
import dashboardImg from "@/public/dashboard-img.png";

const featureList = [
  {
    title: "AI-Powered Photos",
    description:
      "Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.",
    icon: <ImageIcon className="h-6 w-6" />,
  },
  {
    title: "Diverse Photo Packs at Your Fingertips",
    description:
      "    Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.    ",
    icon: <Package2 className="h-6 w-6" />,
  },
  {
    title: "Customizable Photo Generation",
    description:
      "    Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.    ",
    icon: <Palette className="h-6 w-6" />,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="flex w-full flex-col items-center justify-center bg-muted py-32"
    >
      <div className="lg: container relative mx-auto grid grid-cols-1 gap-8 bg-muted px-6 xs:px-8 sm:mx-8 sm:px-0 lg:mx-auto lg:grid-cols-2">
        <div className="col-span-full space-y-4">
          <AnimatedGradientText className="ml-0 bg-background backdrop-blur-0">
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Features
            </span>
          </AnimatedGradientText>
          <h2 className="text-2xl font-bold xs:text-3xl sm:text-4xl">
            Unlock Unlimited Possibilities with Vizion AI
          </h2>
          <p className="text-base text-muted-foreground lg:max-w-[75%]">
            Our platform offers a wide range of features designed to enhance
            your image creation experience. From easy-to-use editing tools to
            powerful AI-powered image generation, we have everything you need to
            bring your ideas to life.
          </p>
        </div>
        <div className="order-2 flex flex-col items-start justify-start lg:order-1">
          {featureList.map((item, i) => (
            <div
              className="flex items-start gap-2 rounded-lg py-8 sm:gap-4 lg:p-12"
              key={i}
            >
              <span className="rounded-md bg-muted p-0 text-foreground sm:bg-foreground sm:p-2 sm:text-background">
                {item.icon}
              </span>
              <div className="">
                <h3 className="text-xl font-medium sm:text-2xl">
                  {item.title}
                </h3>
                <p className="pt-2 text-sm text-muted-foreground xs:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "top-32 order-1 animate-gradient rounded-lg border-b-gray-300 border-r-gray-300 bg-gradient-to-r from-[#627FAB] via-[#B95480] to-[#627FAB] bg-[length:var(--bg-size)_100%] pl-16 [--bg-size:400%] lg:sticky lg:order-2",
          )}
        >
          <Image
            src={dashboardImg}
            alt="Featured image"
            className="h-auto w-full rounded-bl-lg"
          />
        </div>
      </div>
    </section>
  );
}
