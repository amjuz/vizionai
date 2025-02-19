import { Marquee } from "@/components/magicui/marquee";
import img1 from "@/public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import img2 from "@/public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg";
import img3 from "@/public/hero-images/Confident Woman in Red Outfit.jpeg";
import img4 from "@/public/hero-images/Confident Woman in Urban Setting.jpeg";
import img5 from "@/public/hero-images/Futuristic Woman in Armor.jpeg";
import img6 from "@/public/hero-images/Futuristic Helmet Portrait.jpeg";
import img7 from "@/public/hero-images/Man in Brown Suit.jpeg";
import img8 from "@/public/hero-images/Poised Elegance of a Young Professional.jpeg";
import img9 from "@/public/hero-images/Professional Business Portrait.jpeg";
import img10 from "@/public/hero-images/Sophisticated Businessman Portrait.jpeg";
import img11 from "@/public/hero-images/Professional Woman in Navy Blue Suit.jpeg";
import Image from "next/image";
import { cn } from "@/lib/utils";


const Images = [
    {
      src: img1,
      alt: "AI generated image",
    },
    {
      src: img2,
      alt: "AI generated image",
    },
    {
      src: img3,
      alt: "AI generated image",
    },
    {
      src: img4,
      alt: "AI generated image",
    },
    {
      src: img5,
      alt: "AI generated image",
    },
    {
      src: img6,
      alt: "AI generated image",
    },
    {
      src: img7,
      alt: "AI generated image",
    },
    {
      src: img8,
      alt: "AI generated image",
    },
    {
      src: img9,
      alt: "AI generated image",
    },
    {
      src: img10,
      alt: "AI generated image",
    },
    {
      src: img11,
      alt: "AI generated image",
    },
  ];
  
export const MarqueeColumn = ({
    duration,
    reverse,
    className,
  }: {
    reverse: boolean;
    duration?: string;
    className?: string;
  }) => {
    return (
      <Marquee
        reverse={reverse}
        pauseOnHover
        vertical
        className={cn(
          "w-full relative h-full flex flex-col justify-center items-center", className
        )}
        style={{
            // @ts-expect-error types script not able to infer variable type 
          '--duration': duration
        }}
      >{Images.sort(()=>Math.random() - 0.5).map((image,i)=>{
        return <Image key={i} src={image.src} alt={image.alt} priority className="w-full h-full object-cover rounded opacity-[0.25] hover:opacity-[100] transition-opacity duration-300 ease-in-out"/>
      })}</Marquee>
    );
  };
  