import Link from "next/link";
import Logo from "../dashboard-layout/Logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import MobileNavigation from "./MobileNavigation";

const NavItems = () => {
  return (
    <>
      <Link
        href={"#features"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Features
      </Link>
      <Link
        href={"#pricing"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Pricing
      </Link>
      <Link
        href={"#faqs"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        FAQs
      </Link>
      <Link
        href={"/auth/signup"}
        className={cn(
          "text-sm font-medium underline-offset-4",
          buttonVariants({ variant: "default" })
        )}
      >
        Sign up
      </Link>
    </>
  );
};
export default function Navigation() {
  return (
    <div className="w-full bg-background/60 backdrop-blur-md fixed top-0 px-8 py-4 z-50 shadow-xl overflow-hidden">
      <header className="container mx-auto flex items-center">
        <Logo />
        <nav className="ml-auto hidden md:flex items-center justify-center gap-6 ">
          <NavItems />
        </nav>
        {/* mobile navigation */}
        <MobileNavigation>
          <NavItems />
        </MobileNavigation>
      </header>
    </div>
  );
}
