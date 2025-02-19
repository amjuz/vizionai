import { Table } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "@/components/ui/badge";

interface IRecentModalsProps {
  models: Table["models"]["Row"][]
}
export default function RecentModals({ models }: IRecentModalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Models</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-4">
          {models.length === 0 ? (
            <p> No models trained yet</p>
          ) : (
            models.map((model) => {
              return (
                <div
                  key={model.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="">
                    <p className="text-sm font-medium">{model.model_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {model.gender}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(model.training_status)}>{model.training_status}</Badge>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusVariant(status: Table["models"]["Row"]["training_status"]) {
  switch (status) {
    case "succeeded": return 'default'
    case "starting":
    case "processing": return 'secondary'
    case "canceled": 
    case "failed": return 'destructive'
    default: 'secondary'
  }
}
