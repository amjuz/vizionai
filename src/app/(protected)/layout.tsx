import { AppSidebar } from "@/components/dashboard-layout/app-sidebar";
import ThemeSwitcher from "@/components/landing-page/navigation/theme-switcher";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function protectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full flex justify-between items-center gap-2 my-4 px-4" >
          <SidebarTrigger className="-ml-1" />
          <ThemeSwitcher/>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
