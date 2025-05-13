import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export const SidebarLinks = ({ linkData }) => {
  return (
    <Link href={`${linkData.url}`}>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={linkData.title}>
          {linkData.icon && <linkData.icon className="shrink-0 max-h-4" />}{" "}
          <span>{linkData.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};
