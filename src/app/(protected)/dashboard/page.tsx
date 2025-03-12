import RecentImages from "@/components/dashboard/images/RecentImages";
import StatusCards from "@/components/dashboard/cards/StatusCards";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import QuickActions from "@/components/dashboard/cards/QuickActions";
import RecentModals from "@/components/dashboard/cards/RecentModals";
import { fetchModelDto } from "@/lib/services/dto/model";

async function page() {
  const supabase = await createClient();
  const [user, models] = await Promise.all([
    getUser(supabase),
    fetchModelDto(supabase),
  ]);
  return (
    // <Suspense fallback={<div className="w-full h-full bg-red-50">loading</div>}>
      <section className="container mx-auto flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back,{" "}
            {user?.user_metadata.full_name ?? user?.user_metadata.name}
          </h2>
        </div>
        <StatusCards user={user} client={supabase} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <RecentImages client={supabase} />
          <div className="col-span-full flex h-full flex-col gap-6 sm:flex-row xl:col-span-1 xl:flex-col xl:gap-0 xl:space-y-6">
            <QuickActions />
            <RecentModals models={models || []} />
          </div>
        </div>
      </section>
    // </Suspense>
  );
}

export default page;
