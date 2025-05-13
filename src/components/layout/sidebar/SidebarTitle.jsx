import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutPanelLeft } from "lucide-react";
import Link from "next/link";

export const SidebarTitle = () => {
  return (
    <Link href="/">
      <SidebarMenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
          <LayoutPanelLeft />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">HR</span>
          <span className="truncate text-xs">SaaS</span>
        </div>
      </SidebarMenuButton>
    </Link>
  );
};
