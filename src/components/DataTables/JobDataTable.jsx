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

// Assuming FilterCandidateName can be reused or adapted for filtering by 'name'
// If not, you might need a specific FilterJobName component
import { FilterCandidateName } from "./table-utils";

export const JobDataTable = ({
  jobs, // Changed from candidates
  columns,
  onSelectJob, // Changed from onSelectCandidate
}) => {
  const [data, setData] = useState(jobs || []); // Initialized with jobs
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (jobs?.length > 0) {
      setData(jobs);
    } else {
      setData([]);
    }
  }, [jobs]); // Dependency array includes jobs

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
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Reusing FilterCandidateName but targeting the 'name' column */}
          {/* You might need to adjust FilterCandidateName or create a new one */}
          {/* if it's tightly coupled to 'candidate_name' */}
          <FilterCandidateName
            table={table}
            columnId="name"
            placeholder="Buscar por nombre..."
          />
          {/* Removed suitability and position filters */}
        </div>

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
                  onClick={() => onSelectJob && onSelectJob(row.original)} // Changed to onSelectJob
                  className="cursor-pointer" // Add cursor pointer to indicate clickable rows
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
    </>
  );
};
