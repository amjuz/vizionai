import AccountCard from "@/components/account/AccountCard";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function page() {
  return (
    <section className="container space-y-8 mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Accounts  settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="grid gap-8">
      <AccountCard />
      security components
      </div>
    </section>
  );
}

export default page;
