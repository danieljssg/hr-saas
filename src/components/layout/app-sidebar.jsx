"use client";

import * as React from "react";
import { AudioWaveform, Wrench } from "lucide-react";

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

const LinksData = [
  {
    title: "Solicitudes",
    url: "/solicitudes",
    icon: AudioWaveform,
  },
  {
    title: "Mantenimientos Programados",
    url: "/mantto",
    icon: Wrench,
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
