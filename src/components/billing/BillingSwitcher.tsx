'use client'

import { useBillingInterval } from "@/provider/BillingContextProvider";
import { Switch } from "../ui/switch";

export default function BillingSwitcher() {
  const { billingInterval, setBillingInterval } = useBillingInterval();
  return (
    <Switch
      id="pricing-switch"
      checked={billingInterval === "year"}
      onCheckedChange={(checked) =>
        setBillingInterval(checked ? "year" : "month")
      }
    />
  );
}
