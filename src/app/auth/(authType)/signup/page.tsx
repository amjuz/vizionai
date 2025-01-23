import SignUpForm from "@/components/authentication/sign-up-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Signup</h1>
        <p className="text-sm text-muted-foreground">
          Enter details below to create to your account
        </p>
      </div>
      <SignUpForm />
      <div className="flex justify-between">
        <Link className={cn('',buttonVariants({variant:'link'}))} href="/auth/signin">Need an account ? Sign in</Link>
        <Link className={cn('',buttonVariants({variant:'link'}))} href="/auth/reset">forgot password </Link>
      </div>
    </div>
  )
}
