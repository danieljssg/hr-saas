"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

// Format date to a readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export const CandidatesColumns = [
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cargo al que postula
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm bg-primary font-medium text-white rounded-full px-1 py-2 text-center">
          {row.getValue("position")}
        </p>
      );
    },
  },
  {
    accessorKey: "suitable",
    header: "Nivel de Competencia",
    cell: ({ row }) => {
      const suitable = row.getValue("suitable");

      return (
        <div className="text-center items-center justify-center">
          <div
            className={cn(
              suitable ? "bg-emerald-500" : "bg-rose-500",
              "items-center py-2 px-4 text-center min-w-20 max-w-20 text-white rounded-full"
            )}
          >
            {suitable ? "Apto" : "No Apto"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "candidate_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de Candidato
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "candidate_job",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profesión del Candidato
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "candidate_age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Edad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("candidate_age")}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Postulación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
];
