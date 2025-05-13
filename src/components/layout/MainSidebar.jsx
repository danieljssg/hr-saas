import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarTitleBar } from "@/components/layout/Sidebar/SidebarTitleBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export const MainSidebar = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="p-2 gap-2">
        <SidebarTitleBar />
        <main className="flex flex-1 flex-col gap-4 p-2 max-w-[95dvw]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
