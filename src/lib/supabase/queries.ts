import { DbClient } from "@/types";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";

export type TGetUserAuth = Awaited<ReturnType<typeof getUser>>;
export type TGetSubscription = Awaited<ReturnType<typeof getSubscription>>;
export type TGetProducts = Awaited<ReturnType<typeof getProducts>>;
export type TGetUserDetails = Awaited<ReturnType<typeof getUserDetails>>;

export const getUser = async (supabase: DbClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error && error instanceof AuthError || !user) {
    redirect("/auth/signin");
  }

  return user;
};
export const getSubscription = cache(async (supabase: DbClient) => {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: DbClient) => {
  const { data: products } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    // .order('id')
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUserDetails = cache(async (supabase: DbClient) => {
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single();
  return userDetails;
});
