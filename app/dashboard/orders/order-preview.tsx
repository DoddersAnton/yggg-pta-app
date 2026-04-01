"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getOrder } from "@/server/actions/get-order"

type OrderData = Awaited<ReturnType<typeof getOrder>>

type OrderSummaryPopupProps = {
  orderId: number
}

export const OrderSummaryPopup = ({ orderId }: OrderSummaryPopupProps) => {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOpen = async (open: boolean) => {
    if (!open) return
    setLoading(true)
    const data = await getOrder(orderId)
    setOrder(data)
    setLoading(false)
  }

  const orderData = order?.success ?? null
  const tickets = orderData?.orderTickets ?? []
  const total = tickets.reduce((sum, t) => sum + (t.price ?? 0) * (t.quantity ?? 1), 0)

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <button className="inline-block bg-purple-700 text-white font-black text-[10px] uppercase tracking-wide px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
          View
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 gap-0 border-2 border-black shadow-[8px_8px_0px_0px_#000] rounded-none max-w-sm">
        <div className="bg-purple-700 border-b-2 border-black px-5 py-4">
          <DialogTitle className="text-white font-black text-sm uppercase tracking-wide">
            Order #{orderId}
          </DialogTitle>
        </div>

        {loading ? (
          <div className="px-5 py-8 text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Loading…
          </div>
        ) : order?.error ? (
          <div className="px-5 py-8 text-center text-sm font-black text-red-500 uppercase tracking-wide">
            {order.error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-500 font-semibold">
            No tickets found for this order.
          </div>
        ) : (
          <>
            <ul className="divide-y-2 divide-black">
              {tickets.map((ticket) => (
                <li key={ticket.id} className="flex items-center justify-between px-5 py-3 gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight">
                      {ticket.event?.name ?? "Unknown event"}
                    </p>
                    {ticket.ticketHolderName && (
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{ticket.ticketHolderName}</p>
                    )}
                    <p className="text-[10px] text-gray-500 font-medium">Qty: {ticket.quantity}</p>
                  </div>
                  <span className="text-xs font-black text-purple-700 shrink-0">
                    {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
                      (ticket.price ?? 0) * (ticket.quantity ?? 1)
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t-2 border-black bg-purple-50 px-5 py-3">
              <span className="text-xs font-black uppercase tracking-wide">Total</span>
              <span className="text-sm font-black text-purple-700">
                {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(total)}
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
