"use client";
import { Fragment, useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export const SidebarTitleBar = ({ admin }) => {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);

  const [currentPageTitle, setCurrentPageTitle] = useState("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setCurrentPageTitle(document.title);
    }
  }, [path, setCurrentPageTitle]);

  return (
    <header className="bg-sidebar shadow-md border print:hidden rounded-lg justify-between pr-3 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="sm:hidden text-sm">HR SaaS</h1>
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={admin ? "/admin" : "/"}>HR</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              // segment can be undefined if path is "/"
              const isLast = index === segments.length - 1;
              const href = `/${segments.slice(0, index + 1).join("/")}`;

              return (
                <Fragment key={segment + "-" + index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className={
                          !currentPageTitle && segment ? "capitalize" : ""
                        }
                      >
                        {currentPageTitle || segment}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={href}
                        className={segment ? "capitalize" : ""}
                      >
                        {segment}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  );
};
