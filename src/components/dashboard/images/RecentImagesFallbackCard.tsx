import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function RecentImagesFallbackCard() {
  return (
    <Card className="col-span-full flex flex-col xl:col-span-3">
      <CardHeader className="">
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        <p className="text-xl xl:pb-10">No images generated yet!</p>
      </CardContent>
    </Card>
  );
}
