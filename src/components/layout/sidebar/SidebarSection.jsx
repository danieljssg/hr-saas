import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarLinks } from "./SidebarLinks";

export const SidebarSection = ({ title, links }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarLinks key={link.title} linkData={link} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
