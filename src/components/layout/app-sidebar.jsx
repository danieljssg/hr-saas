"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarTitle } from "./sidebar/SidebarTitle";
import { SidebarSection } from "./sidebar/SidebarSection";
import { SideBarUser } from "./sidebar/SideBarUser";
import { LibraryBig, UserRoundSearch } from "lucide-react";

const LinksData = [
  {
    title: "Seguimiento de Candidatos",
    url: "/ats",
    icon: UserRoundSearch,
  },
  {
    title: "Expedientes de Trabajo",
    url: "/records",
    icon: LibraryBig,
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTitle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection title="HR SaaS" links={LinksData} />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
