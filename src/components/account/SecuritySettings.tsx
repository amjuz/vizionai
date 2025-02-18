'use client'
import { updatePassword } from "@/app/actions/auth-actions";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../ui/card";
import toast from "react-hot-toast";
  
export default function SecuritySettings() {
    
    async function handlePasswordReset(){
        toast.promise(updatePassword,{
            loading: "loading...",
            error:"Something went wrong",
            success: "Reset password email sent"
        })
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <h2 className="font-medium">Password</h2>
            <p className="text-sm text-muted-foreground">Change password to keep your account secure</p>
            <Button variant={'outline'} onClick={handlePasswordReset} disabled> 
                Change password
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
