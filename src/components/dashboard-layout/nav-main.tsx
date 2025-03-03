"use client";

import { type LucideIcon } from "lucide-react";
import {
  CreditCard,
  Frame,
  Image,
  Layers,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type TNavMain = {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const data: TNavMain = {
  items: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Generate Image",
      url: "/image-generation",
      icon: Image,
    },
    {
      title: "My Models",
      url: "/models",
      icon: Frame,
    },
    {
      title: "Train Model",
      url: "/model-training",
      icon: Layers,
    },
    {
      title: "My Images",
      url: "/gallery",
      icon: Image,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/account-settings",
      icon: Settings2,
    },
  ],
};

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.items.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className={cn(
              "rounded-sm",
              pathname === item.url
                ? "bg-primary font-semibold text-secondary hover:bg-primary dark:border dark:bg-primary/50 dark:text-primary-foreground"
                : "text-muted-foreground",
            )}
          >
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
