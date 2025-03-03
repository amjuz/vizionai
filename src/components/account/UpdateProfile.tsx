import { getUser } from "@/lib/supabase/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { createClient } from "@/lib/supabase/server";
import UpdateNameForm from "./UpdateNameForm";

export default async function UpdateProfile() {
  const supabase = await createClient();
  const user = await getUser(supabase);

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
