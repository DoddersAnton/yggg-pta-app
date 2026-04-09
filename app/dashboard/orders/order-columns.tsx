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
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { deleteEvent } from "@/server/actions/delete-event"
import { OrderSummaryPopup } from "./order-preview"


export type OrderColumn = {
    id: number; status: string; user: string; totalTickets: number; totalAmount: number; paymentRef: string; orderRef: string; orderDate: Date;
}


const ActionCell = ({ row }: { row: Row<OrderColumn> }) => {
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
      toast.loading("Deleting Order")
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

export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "orderRef",
    header: "Order Ref",
    cell: ({ row }) => {
      const ref = row.getValue("orderRef") as string
      if (!ref) return <span className="text-xs text-gray-400">—</span>
      return (
        <span className="bg-purple-100 text-purple-900 border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
          {ref}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        const chipClass = status === "paid"
          ? "bg-green-500 text-white border-black"
          : status === "cancelled"
          ? "bg-red-500 text-white border-black"
          : "bg-gray-200 text-gray-700 border-black"
        return (
          <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 border-2 shadow-[2px_2px_0px_0px_#000] ${chipClass}`}>
            {status}
          </span>
        )
      },
  },
  {
    accessorKey: "user",
    header: "Name",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
        const timestamp = new Date(row.getValue("orderDate"));
        const formattedTimestamp = `${timestamp.toLocaleDateString("en-GB")} ${timestamp.toLocaleTimeString("en-GB")}`;
        return <div className="font-medium text-xs">{formattedTimestamp}</div>
      },
  },
    {
        accessorKey: "totalTickets",
        header: "Tickets",
        cell: ({ row }) => {
        const capacity = row.getValue("totalTickets")
        return <div className="font-medium text-xs">{capacity as number}</div>
        },
    },
  {
    accessorKey: "totalAmount",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-GB", {
        currency: "GBP",
        style: "currency",
      }).format(price)
      return <div className="font-medium text-xs">{formatted}</div>
    },
  },

 
    {
        accessorKey: "paymentRef",
        header: "Payment Ref",
        cell: ({ row }) => {
        const paymentRef = row.getValue("paymentRef")
        return <div className="font-medium text-xs">{paymentRef as string}</div>
        },
  },
  {
    accessorKey: "View",
    cell: ({ row }) => {
      const orderId = row.getValue("id") as number
      return (
        <OrderSummaryPopup orderId={orderId} /> // Assuming you have a component to show order details
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
]