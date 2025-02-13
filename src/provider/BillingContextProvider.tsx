'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TBillingInterval = "month" | "year";

type TBillingContext = {
  billingInterval: TBillingInterval;
  setBillingInterval: Dispatch<SetStateAction<TBillingInterval>>;
};

export const BillingContext = createContext<TBillingContext>({
  billingInterval: "month",
  setBillingInterval: () => {},
});

export default function BillingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [billingInterval, setBillingInterval] =
    useState<TBillingInterval>("month");

  const value = { billingInterval, setBillingInterval };
  return (
    <BillingContext.Provider value={value}>{children}</BillingContext.Provider>
  );
}

export const useBillingInterval = () => {
  const context = useContext(BillingContext)
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context
} 