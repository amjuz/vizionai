import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";

export default function MobileNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-auto md:hidden overflow-hidden">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className="h-6 w-6" strokeWidth={1.5} />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <nav className="flex flex-col gap-4 mt-12">{children}</nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
