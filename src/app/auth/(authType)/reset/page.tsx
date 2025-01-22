import ResetPassword from "@/components/authentication/reset-password";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <ResetPassword />
      <div className="flex justify-between">
        <Link className={cn('',buttonVariants({variant:'link'}))} href="/auth/signup">forgot password ? Sign in</Link>
      </div>
    </div>
  )
}
