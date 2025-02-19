import Image from "next/image";
import AuthImg from "@/public/Abstract Curves and Colors.jpeg";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Logo from "@/components/dashboard-layout/Logo";

export default async function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect("/dashboard");
  return (
    <main className="h-screen grid grid-cols-2 ">
      <div className="relative w-full flex  p-10 flex-col bg-muted text-primary-foreground">
        <div className="absolute w-full  h-[30%] top-0 left-0 z-10 bg-gradient-to-t from-transparent to-black" />
        <div className="absolute w-full  h-[30%] bottom-0 left-0 z-10 bg-gradient-to-b from-transparent to-black" />
        <Image
          fill
          src={AuthImg}
          alt="login form"
          className="w-full h-full object-cover"
          priority
          sizes="100"
        />
        <div className="relative z-20 flex items-center ">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto ">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Vizion AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.&rdquo;
            </p>
            <footer className="text-sm">Tony K.</footer>
          </blockquote>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
        <div className="max-w-xl w-[350px] mx-auto ">{children}</div>
      </div>
    </main>
  );
}
