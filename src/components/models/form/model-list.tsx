import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { formatDistance } from "date-fns";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  User2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TModelList = {
  data: Database["public"]["Tables"]["models"]["Row"][] | null;
  error: string | null;
  success: boolean;
};

export interface IModelList {
  models: TModelList;
}
function ModelList({ models }: IModelList) {
  const { data } = models;

  if (!data?.length) {
    return (
      <Card className="flex h-[450px] flex-col items-center justify-center text-center">
        <CardHeader>
          <CardTitle>No Models Found.</CardTitle>
          <CardDescription>
            You have not trained any models yet. Start by creating a new model.
          </CardDescription>
          <Link href={"/model-training"} className="inline-block pt-2">
            <Button className="mx-auto w-fit">Create Model</Button>
          </Link>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {data.map((model, index) => (
        <Card
          className="relative flex flex-col overflow-hidden"
          key={`${index}`}
        >
          {/* {model.model_id} */}
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="">{model.model_name}</CardTitle>
              <div className="flex items-center gap-2">
                {model.training_status === "succeeded" ? (
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="capitalize">Ready</span>
                  </div>
                ) : model.training_status === "failed" ||
                  model.training_status === "canceled" ? (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <XCircle className="h-4 w-4" />
                    <span className="capitalize">{model.training_status}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="capitalize">Training</span>
                  </div>
                )}
                {/* @TODO the below component requires refactor as delete model action is currently broken, 
                       
                    ISSUE: Model cannot be deleted as it needs the versionId, currently we are unable
                    to get the correct version from REPLICATE API  
                    
                 */}
                {/* <ModelListAlertDialog data={model} /> */}
              </div>
            </div>

            <CardDescription>
              Created{" "}
              {formatDistance(new Date(model.created_at), new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
            <CardContent className="flex-1 p-0 pt-3">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Training Duration</span>
                    </div>
                    <p className="mt-1 font-medium">
                      {Math.round(Number(model.training_time) / 60) || NaN} mins
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User2 className="h-4 w-4" />
                      <span>Gender</span>
                    </div>
                    <p className="mt-1 font-medium">{model.gender}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="pt-4">
              <Link
                href={
                  model.training_status === "succeeded"
                    ? `/image-generation?model_id=${model.model_id}:${model.version}`
                    : "#"
                }
                className={cn(
                  "group inline-flex w-full",
                  model.training_status !== "succeeded" &&
                    "pointer-events-none opacity-50",
                )}
              >
                <Button
                  className="w-full group-hover:bg-primary/90"
                  disabled={model.training_status !== "succeeded"}
                >
                  Generated Images
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default ModelList;
