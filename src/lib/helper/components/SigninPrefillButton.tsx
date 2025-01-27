"use client";

import { Button } from "@/components/ui/button";
import { cn } from "../../utils";
import { UseFormReturn } from "react-hook-form";

function SigninPrefillButton({
  form,
}: {
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    undefined
  >;
}) {
  return (
    <Button
      variant={"link"}
      className={cn("")}
      onClick={async () => {
        form.setValue("username", "test@gmail.com", { shouldValidate: true });
        form.setValue("password", "1Aa#saasa", { shouldValidate: true });
      }}
    >
      Prefill
    </Button>
  );
}

export default SigninPrefillButton;
