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
  const [user, { data: models }] = await Promise.all([
    getUser(supabase),
    fetchModel(),
  ]);
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <Suspense
          fallback={
            <h2 className="h-[36px] w-[30px] animate-pulse text-3xl font-bold tracking-tight"></h2>
          }
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back,{" "}
            {user?.user_metadata.full_name ?? user?.user_metadata.name}
          </h2>
        </Suspense>
      </div>
      <StatusCards user={user} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <RecentImages />
        <div className="col-span-full flex h-full flex-col gap-6 sm:flex-row xl:col-span-1 xl:flex-col xl:gap-0 
        xl:space-y-6">
          <QuickActions />
          <RecentModals models={models || []} />
        </div>
      </div>
    </section>
  );
}

export default page;
