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
import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { signup } from "@/app/actions/auth-actions";
import SignupPrefillButton from "@/lib/helper/components/SignupPrefillButton";
import { useRouter } from "next/navigation";

const passwordValidationRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const formSchema = z
  .object({
    name: z.string().min(3, { message: "Name cannot be less than 5 letters" }),
    email: z
      .string()
      .min(5, { message: "Email cannot be less than 5 letter" })
      .email({ message: "Should be a valid email" }),
    password: z
      .string({ required_error: "password cannot be empty" })
      .min(6, { message: "Password should have minimum 6 letters" })
      .regex(passwordValidationRegex, {
        message:
          "password must contain 8 letters , 1 upper case, 1 lower case, 1 number, 1 special character",
      }),
    confirmPassword: z.string({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

function SignUpForm({ className }: { className?: string }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const signupToastId = useId();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode:"onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    setLoading(true);
    toast.loading("Signing up", { id: signupToastId });

    const signUpFormData = new FormData();

    signUpFormData.append("name", values.name);
    signUpFormData.append("email", values.email);
    signUpFormData.append("password", values.password);

    const { error, data } = await signup(signUpFormData);
    
    if (error || !data) {
      setLoading(false);
      toast.error(error, { id: signupToastId });
      return ;
    }

    setLoading(false);
    toast.success("Sign up successful! Please confirm your email address.", {
      id: signupToastId,
    });

    router.push("/auth/signin");
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="font-semibold">Name</FormLabel>
                  <SignupPrefillButton form={form} />
                </div>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Re-enter Password
                </FormLabel>
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
          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}Sign
            up
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;

// function SignUpForm() {
//   return (
//     <div>sign-up-form</div>
//   )
// }

// export default SignUpForm
