import Link from "next/link";
import Logo from "../../dashboard-layout/Logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import MobileNavigation from "./MobileNavigation";
import ThemeSwitcher from "./theme-switcher";

const NavItems = () => {
  return (
    <>
      <ThemeSwitcher />
      <Link
        href={"#features"}
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        Features
      </Link>
      <Link
        href={"#pricing"}
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        Pricing
      </Link>
      <Link
        href={"#faqs"}
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        FAQs
      </Link>
      <Link
        href={"/auth/signup"}
        className={cn(
          "text-sm font-medium underline-offset-4",
          buttonVariants({ variant: "default" }),
        )}
      >
        Sign up
      </Link>
    </>
  );
};
export default function Navigation() {
  return (
    <div className="fixed top-0 z-50 w-full overflow-hidden bg-background/60 px-8 py-4 shadow-xl backdrop-blur-md">
      <nav className="container mx-auto flex items-center">
        <Logo />
        <div className="ml-auto hidden items-center justify-center gap-6 md:flex">
          <NavItems />
        </div>
        {/* mobile navigation */}
        <MobileNavigation>
          <NavItems />
        </MobileNavigation>
      </nav>
    </div>
  );
}
