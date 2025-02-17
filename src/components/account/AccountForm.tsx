"use client";

import {
  AccountFormValidator,
  TAccountFormValidator,
} from "@/lib/validators/accountForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TGetUserAuth } from "@/lib/supabase/queries";
import toast from "react-hot-toast";
import { updateProfile } from "@/app/actions/auth-actions";

interface IAccountFormProps {
  user: TGetUserAuth;
}
export default function AccountForm({ user }: IAccountFormProps) {
  const form = useForm<TAccountFormValidator>({
    resolver: zodResolver(AccountFormValidator),
    defaultValues: {
      email: user?.email,
      fullName: "",
    },
  });

  async function onSubmit({ fullName }: TAccountFormValidator) {
    // const MutateData = await updateProfile({ full_name: fullName })
    toast.promise(updateProfile({ full_name: fullName }), {
      loading: "Updating Profile",
      error: (err)=>`${err}` || 'something went wrong' ,
      success: "Mutate Successful",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="font-semibold">Full name</FormLabel>
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
              <div className="flex justify-between items-center">
                <FormLabel className="font-semibold">Email</FormLabel>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your Email"
                  {...field}
                  disabled={(() => {
                    if (field.value) {
                      return true;
                    }
                    return false;
                  })()}
                />
              </FormControl>
              <FormDescription>
                Your email address is used for signin and communication
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          //  disabled={isPending}
        >
          {/* {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />} */}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
