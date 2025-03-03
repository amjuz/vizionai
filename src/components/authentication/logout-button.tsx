"use client";

import { signout } from "@/app/actions/auth-actions";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [pending, setPending] = useState(false);
  const router = useRouter()
  async function logout() {
    setPending(true);
    const {error, success} = await signout();
    if(!success || error){
      setPending(false);
      toast.error("Logout failed, Please try again")

    }
    setPending(false);
    toast.success("Logout complete!")
    router.push('/auth/signin')
  }
  return (
    <Button onClick={logout} disabled={pending}>
      {pending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}Sign out
    </Button>
  );
}

export default LogoutButton;
