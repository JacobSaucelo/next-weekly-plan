"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  CircleCheck,
  CircleHelp,
  CircleX,
  Timer,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowDownUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Task as TaskType } from "./Store.todo";

export const columns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "id",
    header: "Task",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <span>Title</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDownUp className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const label = row.original.label;
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label}</Badge>}
          <span className="max-w-[450px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <p className="flex items-center gap-1">
          {handlePriorityIcons(payment.priority)}
          {payment.priority}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <p className="flex items-center gap-1">
          {handleStatusIcons(payment.status)}
          {payment.status}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID - {payment.id}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const handlePriorityIcons = (icon: string) => {
  switch (icon) {
    case "Low":
      return <ArrowDown className="text-blue-400" />;
    case "Medium":
      return <ArrowRight className="text-yellow-400" />;
    case "High":
      return <ArrowUp className="text-red-700" />;

    default:
      return <CircleHelp className="text-gray-400" />;
  }
};
const handleStatusIcons = (icon: string) => {
  switch (icon) {
    case "BackLog":
      return <CircleHelp className="text-gray-400" />;
    case "Todo":
      return <Circle className="text-blue-400" />;
    case "In Progress":
      return <Timer className="text-yellow-400" />;
    case "Done":
      return <CircleCheck className="text-green-400" />;
    case "Canceled":
      return <CircleX className="text-red-700" />;

    default:
      return <CircleHelp className="text-gray-400" />;
  }
};
