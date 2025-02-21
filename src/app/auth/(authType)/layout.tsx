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
    <main className="flex flex-col xl:grid h-screen  xl:grid-cols-2">
      <div className="relative flex w-full flex-col bg-muted p-10 text-primary-foreground">
        <div className="absolute left-0 top-0 z-10 h-[30%] w-full bg-gradient-to-t from-transparent to-black" />
        <div className="absolute bottom-0 left-0 z-10 h-[30%] w-full bg-gradient-to-b from-transparent to-black" />
        <Image
          fill
          src={AuthImg}
          alt="login form"
          className="h-full w-full object-cover"
          priority
          sizes="100"
        />
        <div className="relative z-20 flex items-center">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
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
      <div className="relative flex h-full w-full flex-col items-center justify-center p-8">
        <div className="mx-auto w-[350px] max-w-xl">{children}</div>
      </div>
    </main>
  );
}
