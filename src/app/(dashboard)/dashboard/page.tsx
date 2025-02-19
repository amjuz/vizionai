import RecentImages from "@/components/dashboard/images/RecentImages";
import StatusCards from "@/components/dashboard/cards/StatusCards";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import QuickActions from "@/components/dashboard/cards/QuickActions";
import RecentModals from "@/components/dashboard/cards/RecentModals";
import { fetchModel } from "@/app/actions/model-actions";

async function page() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  const {data: models } = await fetchModel()
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <Suspense
          fallback={
            <h2 className="text-3xl font-bold tracking-tight w-[30px] h-[36px] animate-pulse"></h2>
          }
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back,{" "}
            {user?.user_metadata.full_name ?? user?.user_metadata.name}
          </h2>
        </Suspense>
      </div>
      <StatusCards user={user} />
      <div className="grid gap-6 grid-cols-4">
        <RecentImages />
        <div className="flex flex-col gap-6">
          <QuickActions />
          <RecentModals models={models || []}/>
        </div>
      </div>
    </section>
  );
}

export default page;
