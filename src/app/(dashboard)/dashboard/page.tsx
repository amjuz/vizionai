import StatusCards from "@/components/dashboard/StatusCards";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function page() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  return (
    <section className="container mx-auto flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <Suspense
          fallback={<h2 className="text-3xl font-bold tracking-tight w-[30px] h-[36px] animate-pulse"></h2>}
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back,{" "}
            {user?.user_metadata.full_name ?? user?.user_metadata.name}
          </h2>
        </Suspense>
      </div>
      <StatusCards user={user} />
    </section>
  );
}

export default page;
