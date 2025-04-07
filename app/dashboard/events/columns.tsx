"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useAction } from "next-safe-action/hooks"
import { deleteEvent } from "@/server/actions/delete-event"
import { toast } from "sonner"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


type EventColummn = {
    id: number; name: string; price: number; capacity: number; remainingCapacity: number; startDate: Date; endDate: Date; image: string; imageWel: string;
}

const ActionCell = ({ row }: { row: Row<EventColummn> }) => {
  const { execute } = useAction(deleteEvent, {
    onSuccess: (data) => {
      if (data?.data?.error) {
        toast.error(data?.data.error)
      }
      if (data?.data?.success) {
        toast.success(data.data.success)
      }
    },
    onExecute: () => {
      toast.loading("Deleting Event")
    },
  })
  const event = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
          <Link href={`/dashboard/add-event?id=${event.id}`}>
            Edit Event
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute({ id: event.id })}
          className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
        >
          Delete Event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<EventColummn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startDate",
    header: "StartDate",
    cell: ({ row }) => {
        const timestamp = new Date(row.getValue("startDate"));
        const formattedTimestamp = `${timestamp.toLocaleDateString("en-GB")} ${timestamp.toLocaleTimeString("en-GB")}`;
        return <div className="font-medium text-xs">{formattedTimestamp}</div>
      },
  },
  {
    accessorKey: "endDate",
    header: "EndDate",
    cell: ({ row }) => {
        const timestamp = new Date(row.getValue("endDate"));
        const formattedTimestamp = `${timestamp.toLocaleDateString("en-GB")} ${timestamp.toLocaleTimeString("en-GB")}`;
        return <div className="font-medium text-xs">{formattedTimestamp}</div>
      },
  },
    {
        accessorKey: "capacity",
        header: "Capacity",
        cell: ({ row }) => {
        const capacity = row.getValue("capacity")
        return <div className="font-medium text-xs">{capacity as number}</div>
        },
    },
    {
        accessorKey: "remainingCapacity",
        header: "Remaining Capacity",
        cell: ({ row }) => {
        const remainingCapacity = row.getValue("remainingCapacity")
        return <div className="font-medium text-xs">{remainingCapacity as number}</div>
        },
    },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-GB", {
        currency: "GBP",
        style: "currency",
      }).format(price)
      return <div className="font-medium text-xs">{formatted}</div>
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string
      const cellTitle = row.getValue("name") as string
      return (
        <Popover>
      <PopoverTrigger asChild>
        <div className="">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={200}
            height={200}
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>
      )
    },
  },
  {
    accessorKey: "imageWel",
    header: "Image (Welsh)",
    cell: ({ row }) => {
      const cellImage = row.getValue("imageWel") as string
      const cellTitle = row.getValue("name") as string
      return (
        <Popover>
        <PopoverTrigger asChild>
          <div className="">
            <Image
              src={cellImage}
              alt={cellTitle}
              width={50}
              height={50}
              className="rounded-md"
            />
          </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Image
              src={cellImage}
              alt={cellTitle}
              width={200}
              height={200}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
]