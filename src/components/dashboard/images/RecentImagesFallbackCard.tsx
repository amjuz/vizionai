import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function RecentImagesFallbackCard() {
    return (
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Generations</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <p className="text-muted-foreground mt-16">
              No images generated yet!
            </p>
          </CardContent>
        </Card>
      );
    }