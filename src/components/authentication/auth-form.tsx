"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import { Button } from "../ui/button";
import SignUpForm from "./sign-up-form";
import ResetPassword from "./reset-password";
import Link from "next/link";

export type TAuthPage = "signin" | "signup" | "forgot-pass";

export default function AuthForm() {

  const [authType, setAuthType] = useState<TAuthPage>("signin");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        {authType === "signup" && (
          <h1 className="text-2xl font-semibold tracking-tight">SignUp</h1>
        )}
        {authType === "forgot-pass" && (
          <h1 className="text-2xl font-semibold tracking-tight">forgot pass</h1>
        )}
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      {authType === "signin" && <LoginForm />}
      {authType === "signup" && <SignUpForm />}
      {authType === "forgot-pass" && <ResetPassword />}
      <div className="flex justify-between ">
        <Button
          variant={"link"}
          className="p-0 "
          onClick={() => {
            setAuthType((prev)=> {
              if(prev === 'signin' || prev === 'forgot-pass') return 'signup'
              return 'signin'
            })
          }}
        >
          {authType === "signin"
            ? "Need an account ? Sign up"
            : "Already have an account ? Sign in"}
        </Button>
        {authType === "signin" && (
          <Button
            variant={"link"}
            className="p-0"
            onClick={() => {
              setAuthType("forgot-pass");
            }}
          >
            forgot password ?
          </Button>
        )}
      </div>
      {authType !== "forgot-pass" && (
        <p className="text-muted-foreground text-center text-sm px-8">
          By clicking signup, you agree to our{" "}
          <Link
            href={""}
            className={"underline underline-offset-4 hover:text-primary"}
          >
            Terms of service
          </Link>{" "}
          and{" "}
          <Link
            href={""}
            className={"underline underline-offset-4 hover:text-primary"}
          >
            Privacy policy.
          </Link>
        </p>
      )}
    </div>
  );
}
