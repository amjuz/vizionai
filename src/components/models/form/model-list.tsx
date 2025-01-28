import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/database.types";
import Link from "next/link";

type TModelList = {
  data: Database["public"]["Tables"]["models"]["Row"][] | null;
  error: string | null;
  success: boolean;
};

interface IModelList {
  models: TModelList;
}
function ModelList({ models }: IModelList) {
  const data = models;
  console.log(data);
  
  if (true) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Models Found.</CardTitle>
          <CardDescription>
            You have not trained any models yet. Start by creating a new model.
          </CardDescription>
          <Link href={"/model-training"} className="inline-block pt-2" />
          <Button className="w-fit">Create Model</Button>
        </CardHeader>
      </Card>
    );
  }
  return <div>model-list</div>;
}

export default ModelList;
