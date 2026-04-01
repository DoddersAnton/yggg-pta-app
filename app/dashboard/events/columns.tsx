"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks"
import { deleteEvent } from "@/server/actions/delete-event"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type EventColummn = {
  id: number
  name: string
  price: number
  capacity: number
  remainingCapacity: number
  startDate: Date
  endDate: Date
  image: string
  imageWel: string
}

const ActionCell = ({ row }: { row: Row<EventColummn> }) => {
  const { execute } = useAction(deleteEvent, {
    onSuccess: (data) => {
      if (data?.data?.error) toast.error(data.data.error)
      if (data?.data?.success) toast.success(data.data.success)
    },
    onExecute: () => toast.loading("Deleting event…"),
  })

  const event = row.original

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/add-event?id=${event.id}`}
        className="inline-block bg-white text-black font-black text-[10px] uppercase tracking-wide px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
      >
        Edit
      </Link>
      <button
        onClick={() => execute({ id: event.id })}
        className="inline-block bg-red-500 text-white font-black text-[10px] uppercase tracking-wide px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
      >
        Delete
      </button>
    </div>
  )
}

const ImageCell = ({ image, title }: { image: string; title: string }) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className="border-2 border-black overflow-hidden w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
        <Image src={image} alt={title} width={40} height={40} className="object-cover w-full h-full" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-none">
      <Image src={image} alt={title} width={240} height={160} className="object-cover block" />
    </PopoverContent>
  </Popover>
)

export const columns: ColumnDef<EventColummn>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-xs font-black text-gray-500">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="text-xs font-black uppercase">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Start",
    cell: ({ row }) => {
      const d = new Date(row.getValue("startDate"))
      return <span className="text-xs font-medium whitespace-nowrap">{d.toLocaleDateString("en-GB")} {d.toLocaleTimeString("en-GB")}</span>
    },
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ row }) => {
      const d = new Date(row.getValue("endDate"))
      return <span className="text-xs font-medium whitespace-nowrap">{d.toLocaleDateString("en-GB")} {d.toLocaleTimeString("en-GB")}</span>
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => <span className="text-xs font-semibold">{row.getValue("capacity") as number}</span>,
  },
  {
    accessorKey: "remainingCapacity",
    header: "Remaining",
    cell: ({ row }) => {
      const remaining = row.getValue("remainingCapacity") as number
      const capacity = row.getValue("capacity") as number
      const pct = capacity > 0 ? (remaining / capacity) * 100 : 100
      const chip =
        pct === 0
          ? "bg-red-500 text-white border-black"
          : pct <= 30
          ? "bg-orange-400 text-black border-black"
          : "bg-green-500 text-white border-black"
      return (
        <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 border-2 shadow-[2px_2px_0px_0px_#000] ${chip}`}>
          {remaining}
        </span>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-xs font-black text-purple-700">
        {new Intl.NumberFormat("en-GB", { currency: "GBP", style: "currency" }).format(parseFloat(row.getValue("price")))}
      </span>
    ),
  },
  {
    accessorKey: "image",
    header: "Img (EN)",
    cell: ({ row }) => (
      <ImageCell image={row.getValue("image") as string} title={row.getValue("name") as string} />
    ),
  },
  {
    accessorKey: "imageWel",
    header: "Img (CY)",
    cell: ({ row }) => (
      <ImageCell image={row.getValue("imageWel") as string} title={row.getValue("name") as string} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
]
