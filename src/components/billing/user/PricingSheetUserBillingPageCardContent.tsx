import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function PricingSheetUserBillingPageCardContent() {
  return (
    <div className="px-5 py-4 pb-8">
      <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
        <span>Plan Summary</span>
        <Badge variant={"secondary"} className="bg-primary/10">
          No Plan
        </Badge>
      </h3>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-5 flex flex-col pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Image Generation credits left
            </span>
            <span className="font-medium">0 remaining</span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress value={0} className="w-full h-2" />
          </div>
        </div>

        <div className="col-span-5 flex flex-col pr-12">
          <div className="flex-1 text-xs font-normal flex w-full justify-between pb-1">
            <span className="font-normal text-muted-foreground ml-1 lowercase">
              Model Training credits left
            </span>
            <span className="font-medium">0 remaining</span>
          </div>
          <div className="mb-1 flex items-end ">
            <Progress value={0} className="w-full h-2" />
          </div>
        </div>

        <div className="col-span-full flex flex-col ">
          Please upgrade to continue using the app.
        </div>
      </div>
    </div>
  );
}
