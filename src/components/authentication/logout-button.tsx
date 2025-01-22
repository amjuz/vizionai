"use client";

import { signout } from "@/app/actions/auth-actions";
import { Button } from "../ui/button";

function LogoutButton() {
  async function logout() {
    await signout();
  }
  return <Button onClick={logout}>Sign out</Button>;
}

export default LogoutButton;
