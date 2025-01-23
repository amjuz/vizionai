"use client";

import { signout } from "@/app/actions/auth-actions";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function LogoutButton() {
  const [pending, setPending] = useState(false);
  async function logout() {
    setPending(true);
    await signout();
    setPending(false);
    // toast.success("Logout complete!")
  }
  return (
    <Button onClick={logout} disabled={pending}>
      {pending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}Sign out
    </Button>
  );
}

export default LogoutButton;
