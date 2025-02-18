import SecuritySettings from "@/components/account/SecuritySettings";
import UpdateProfile from "@/components/account/UpdateProfile";

async function page() {
  return (
    <section className="container space-y-8 mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Accounts settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="grid gap-8">
        <UpdateProfile />
        <SecuritySettings/>
      </div>
    </section>
  );
}

export default page;
