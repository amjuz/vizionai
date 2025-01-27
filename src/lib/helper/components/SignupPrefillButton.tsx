"use client";

import { Button } from "@/components/ui/button";
import { cn } from "../../utils";
import { UseFormReturn } from "react-hook-form";

function SignupPrefillButton({
  form,
}: {
  form: UseFormReturn<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}) {
  return (
    <Button
      variant={"link"}
      className={cn("")}
      onClick={async () => {
        form.setValue("name", "test profile", { shouldValidate: true });
        form.setValue("email", "test@gmail.com", { shouldValidate: true });
        form.setValue("password", "1Aa#saasa", { shouldValidate: true });
        form.setValue("confirmPassword", "1Aa#saasa", { shouldValidate: true });
      }}
    >
      Prefill
    </Button>
  );
}

export default SignupPrefillButton;
