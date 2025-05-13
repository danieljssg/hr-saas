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
import { Input } from "@/components/ui/input";
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

export const CandidatesDataTable = ({
  candidates,
  columns,
  onSelectCandidate,
}) => {
  const [data, setData] = useState(candidates || []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (candidates?.length > 0) {
      setData(candidates);
    } else {
      setData([]);
    }
  }, []);

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filter by name */}
        <div className="flex-1">
          <Input
            placeholder="Búsqueda por nombre"
            value={table.getColumn("candidate_name")?.getFilterValue() || ""}
            onChange={(e) =>
              table.getColumn("candidate_name")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>

        {/* Filter by position */}
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

        <div className="w-[200px]">
          <Select
            value={
              table.getColumn("suitable")?.getFilterValue() === undefined
                ? ""
                : table.getColumn("suitable")?.getFilterValue().toString()
            }
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("suitable")?.setFilterValue(undefined);
              } else {
                table.getColumn("suitable")?.setFilterValue(value === "true");
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nivel de Competencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Apto</SelectItem>
              <SelectItem value="false">No Apto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onSelectCandidate(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No hay datos para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Ant.
        </Button>
        <Button
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sig.
        </Button>
      </div>
    </div>
  );
};
