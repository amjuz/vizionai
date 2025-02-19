import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CreditCard, PlusIcon, Wand2Icon } from "lucide-react";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
        <CardDescription>Get started with common actions</CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-4">
        <Link
          href={"/image-generation"}
          className={cn(buttonVariants({ className: "w-full" }))}
        >
          <Wand2Icon className="mr-2 h-4 w-4" /> Generate Images
        </Link>
        <Link
          href={"/model-training"}
          className={cn(
            buttonVariants({ className: "w-full", variant: "destructive" })
          )}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Train new model
        </Link>
        <Link
          href={"/billing"}
          className={cn(
            buttonVariants({ className: "w-full", variant: "secondary" })
          )}
        >
          <CreditCard className="mr-2 h-4 w-4" /> Billing
        </Link>
      </CardContent>
    </Card>
  );
}
