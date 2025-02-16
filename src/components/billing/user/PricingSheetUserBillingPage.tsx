import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import UserBillingPlans from "./UserBillingPlans";

export default async function PricingSheetUserBillingPage() {
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Show all plans</Button>
      </SheetTrigger>
      <SheetContent className={cn("h-[calc(100vh-20%)]")} side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Choose subscription plan</SheetTitle>
          <SheetDescription>
            Choose a plan that fits your need and budget to continue using
            service
          </SheetDescription>
          <UserBillingPlans />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
