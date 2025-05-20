"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const path = usePathname();
  const splitpath = path.split("/");
  const pathWithoutLast = splitpath.slice(0, splitpath.length - 1).join("/");

  return (
    <Button
      onClick={() => router.push(pathWithoutLast || "/")}
      size="icon"
      variant="outline"
      className="shrink-0"
    >
      <ChevronLeft />
    </Button>
  );
};
