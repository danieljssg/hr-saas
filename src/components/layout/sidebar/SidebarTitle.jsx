import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutPanelLeft } from "lucide-react";

export const SidebarTitle = () => {
  return (
    <SidebarMenuButton size="lg">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
        <LayoutPanelLeft />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">TUBRICA</span>
        <span className="truncate text-xs">Sistemas</span>
      </div>
    </SidebarMenuButton>
  );
};
