import { getUser } from "@/lib/supabase/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AccountForm from "./AccountForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdateNameForm from "./AccountForm";

export default async function UpdateProfile() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateNameForm user={user} />
      </CardContent>
    </Card>
  );
}
