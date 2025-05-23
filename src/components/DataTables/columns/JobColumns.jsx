"use client";

import { cn } from "@/lib/utils";

export const JobColumns = [
  {
    accessorKey: "name",
    header: "Nombre del Cargo",
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description");
      const truncatedDescription =
        description.length > 100
          ? description.substring(0, 97) + "..."
          : description;
      return <div className="max-w-xs truncate">{truncatedDescription}</div>;
    },
  },
  {
    accessorKey: "level",
    header: "Nivel",
    cell: ({ row }) => {
      const level = row.getValue("level");
      return <div className="text-center">{level}</div>;
    },
  },
  {
    accessorKey: "filepath",
    header: "Archivo",
    cell: ({ row }) => {
      const filepath = row.getValue("filepath");
      // Optional: Render as a link if it's a URL or file path
      return filepath ? (
        <a
          href={filepath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate max-w-[150px] block"
        >
          {filepath.split("/").pop()} {/* Display just the filename */}
        </a>
      ) : (
        "N/A"
      );
    },
  },
  // You might want to add a column for actions like Edit/Delete later
  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => {
  //     const job = row.original;
  //     return (
  //       <div>
  //         {/* Add buttons for edit/delete */}
  //       </div>
  //     );
  //   },
  // },
];
