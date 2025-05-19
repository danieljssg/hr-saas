"use client";
import { WhatsappButton } from "@/components/buttons/WhatsappButton";
import { cn } from "@/lib/utils";
import moment from "moment";
import "moment/locale/es";

export const CandidatesColumns = [
  {
    accessorKey: "suitable",
    header: "Competencia",
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
    accessorKey: "position",
    header: "Postulación",
    cell: ({ row }) => {
      const position = row.getValue("position");

      return (
        <div className="flex truncate text-xs bg-primary font-medium text-white rounded-full px-1 py-2 items-center justify-center">
          {position}
        </div>
      );
    },
  },

  {
    accessorKey: "candidate_name",
    header: "Nombre de Candidato",
  },
  {
    accessorKey: "candidate_job",
    header: "Profesión del Candidato",
  },
  {
    accessorKey: "candidate_age",
    header: "Edad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("candidate_age")}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Fecha de Postulación",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formatDate = moment(createdAt).format("DD/MM/YYYY");
      return <p>{formatDate}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Tlfn.",
    cell: ({ row }) => {
      return <WhatsappButton candidate={row.original} />;
    },
  },
];
