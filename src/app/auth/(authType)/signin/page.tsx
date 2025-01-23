import LoginForm from "@/components/authentication/login-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Signin</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials below to login to your account
        </p>
      </div>
      <LoginForm />
      <div className="flex justify-between">
        <Link className={cn('',buttonVariants({variant:'link'}))} href="/auth/signup">Need an account ? Sign up</Link>
        <Link className={cn('',buttonVariants({variant:'link'}))} href="/auth/reset">forgot password</Link>
      </div>
    </div>
  );
}

export default page;
