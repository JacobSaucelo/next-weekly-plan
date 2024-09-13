"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
  FilterPriorityData,
  FilterStatusData,
  useCountStore,
} from "./Store.todo";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const isFetchingTaskList = useCountStore((state) => state.isFetchingTaskList);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <section>
      <article className="flex flex-col gap-2 mt-3">
        <div className="flex gap-1 flex-wrap items-center">
          {FilterStatusData.map((stat) => (
            <Button
              size="default"
              onClick={(event) =>
                table.getColumn("status")?.setFilterValue(stat.Value)
              }
              key={stat.Title}
              className="flex gap-1"
              variant={stat.Variant}
            >
              {stat.Icon}
              {stat.Title}
            </Button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap items-center">
          {FilterPriorityData.map((stat) => (
            <Button
              size="sm"
              onClick={(event) =>
                table.getColumn("priority")?.setFilterValue(stat.Value)
              }
              key={stat.Title}
              className="flex gap-1"
              variant={stat.Variant}
            >
              {stat.Icon}
              {stat.Title}
            </Button>
          ))}
        </div>
      </article>

      <article className="flex items-center justify-between">
        {isFetchingTaskList ? (
          <div className="flex gap-1">
            <p className="text-lg font-semibold px-2">Fetching</p>
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <p className="text-lg font-semibold px-2">
            {data ? data.length : 0} Results found
          </p>
        )}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter tasks by title"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </article>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
