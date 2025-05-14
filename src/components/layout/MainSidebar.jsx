import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarTitleBar } from "@/components/layout/Sidebar/SidebarTitleBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export const MainSidebar = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col p-2 gap-2">
        <SidebarTitleBar />
        <section className="flex flex-col gap-4 p-2 min-h-screen max-h-screen rounded-md shadow-md border">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};
