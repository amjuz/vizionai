import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function RecentImagesFallbackCard() {
    return (
        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Generations</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center h-full justify-center">
            <p className="text-muted-foreground ">
            
              No images generated yet!
            </p>
          </CardContent>
        </Card>
      );
    }

    