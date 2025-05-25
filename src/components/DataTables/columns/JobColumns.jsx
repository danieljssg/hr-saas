"use client";

import { DownloadFile } from "@/components/links/DownloadFile";
import { cn } from "@/lib/utils";

export const JobColumns = [
  {
    accessorKey: "name",
    header: "Nombre del Cargo",
  },
  {
    accessorKey: "filepath",
    header: "Archivo",
    cell: ({ row }) => {
      const filepath = row.getValue("filepath");
      return filepath ? <DownloadFile href={filepath} /> : "N/A";
    },
  },
];
