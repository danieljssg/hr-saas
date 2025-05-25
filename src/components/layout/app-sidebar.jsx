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
import { LibraryBig, UserRoundSearch, BriefcaseBusiness } from "lucide-react";

const LinksData = [
  {
    title: "Empleados",
    url: "/postulacion",
    icon: UserRoundSearch,
  },
  {
    title: "Cargos",
    url: "/organizacion/cargos",
    icon: BriefcaseBusiness,
  },
  {
    title: "Seguimiento de Candidatos",
    url: "/organizacion/ats",
    icon: UserRoundSearch,
  },
  {
    title: "Expedientes de Trabajo",
    url: "/organizacion/expedientes",
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
        <SidebarSection title="Organización" links={LinksData} />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
