import Pricing from "@/components/landing-page/Pricing";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient()

  const {data:{user}} = await supabase.auth.getUser()
  if(!user) redirect('/auth/signin')
    
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Pricing />
    </main>
  );
}
