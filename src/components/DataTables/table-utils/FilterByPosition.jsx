"use client";

import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const positions = [
  { id: 1, name: "Gerente General" },
  { id: 2, name: "Desarrollador Frontend" },
  { id: 3, name: "Desarrollador Backend" },
  { id: 4, name: "Diseñador UX/UI" },
  { id: 5, name: "Analista de Datos" },
];

export const FilterByPosition = ({ table }) => {
  return (
    <div className="w-full md:w-[200px]">
      <Select
        value={table.getColumn("position")?.getFilterValue() || ""}
        onValueChange={(value) => {
          if (value === "all") {
            table.getColumn("position")?.setFilterValue("");
          } else {
            table.getColumn("position")?.setFilterValue(value);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filtrar por cargo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {positions.map((pos) => (
            <SelectItem key={pos.id} value={pos.name}>
              {pos.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
