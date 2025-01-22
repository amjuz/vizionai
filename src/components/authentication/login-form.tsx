"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signin } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { useId, useState } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().email({ message: "Should be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password should have minimum 6 letters" }),
});

type TFormSchema = z.infer<typeof formSchema>;

function LoginForm({ className }: { className?: string }) {
  const [isPending, setIsPending] = useState(false);

  const signInId = useId();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: TFormSchema) {
    setIsPending(true);
    console.log(values);

    const signInFormData = new FormData();

    signInFormData.append("email", values.username);
    signInFormData.append("password", values.password);

    const { data } = await signin(signInFormData);

    if (!data) {
      setIsPending(false);
      toast.error("Login failed, please try again", { id: signInId });
      return;
    } else {
      console.log("data:", data);
      setIsPending(false);
      toast.success("Signin in complete", { id: signInId });
      toast.dismiss();
      redirect("/dashboard");
    }
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="user@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
