import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarTitleBar } from "@/components/layout/Sidebar/SidebarTitleBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export const MainSidebar = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col p-2 gap-2 max-w-[100dvw]">
        <SidebarTitleBar />
        <section className="flex flex-col gap-4 px-4 py-2 min-h-[90dvh] max-h-[90dvh] overflow-y-auto rounded-md shadow-md border">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};
