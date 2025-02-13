import { Database } from '@/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export type TGetUserAuth = Awaited<ReturnType<typeof getUser>> 
export type TGetSubscription = Awaited<ReturnType<typeof getSubscription>> 
export type TGetProducts = Awaited<ReturnType<typeof getProducts>> 
export type TGetUserDetails = Awaited<ReturnType<typeof getUserDetails>> 

export const getUser = cache(async (supabase: SupabaseClient<Database>) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient<Database>) => {
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient<Database>) => {
  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    // .order('id')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient<Database>) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});
