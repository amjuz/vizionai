"use server";

import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
  error: null | string;
  success: boolean;
  data: unknown | null;
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  });

  if (error) {
    console.log(error);
    return {
      data: null,
      error: "Signup failed please try again",
      success: false,
    };
  }
  return {
    data,
    error: null,
    success: true,
  };
}

export async function signin(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  return {
    data,
    error: error?.message ?? null,
    success: !error,
  };
}

export async function signout(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut({});

  redirect("/");
}

export async function updateProfile({ full_name }: { full_name: string }) {
  const supabase = await createClient();

  const user = await getUser(supabase)

  if(!user){
    throw new Error('Unauthenticated user')
  }
   // const { data,error } = await supabase.auth.updateUser({ data: { full_name } });
  const { data, error} = await supabase.from('users').update({full_name}).eq('id',user?.id)
  
  console.log("data",data);
  console.log("err :", error);
  
  
  if(error) {
    throw new Error('Update failed, please try again!')
  }

  return 
}
