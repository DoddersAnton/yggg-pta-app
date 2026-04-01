"use client"

import { useCartStore } from "@/lib/client-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export default function TicketInfo() {
  const { cart, updateTicketHolderName, setCheckoutProgress } = useCartStore()
  const [localNames, setLocalNames] = useState<Record<string, string>>({})

  useEffect(() => {
    const initial = Object.fromEntries(
      cart.flatMap((item) =>
        item.Tickets.map((ticket) => [ticket.id, ticket.ticketHolderName || ""])
      )
    )
    setLocalNames(initial)
  }, [cart])

  const handleChange = (ticketId: string, name: string) => {
    setLocalNames((prev) => ({ ...prev, [ticketId]: name }))
    updateTicketHolderName(ticketId, name)
  }

  if (cart.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-sm font-black uppercase tracking-wide text-gray-500">
        No tickets in cart
      </div>
    )
  }

  return (
    <div>
      {cart.map((cartItem, itemIndex) => (
        <div key={cartItem.id} className={itemIndex > 0 ? "border-t-2 border-black" : ""}>
          {/* Event header */}
          <div className="bg-purple-100 border-b-2 border-black px-6 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-purple-900">{cartItem.name}</p>
          </div>

          {/* Tickets */}
          <div className="divide-y divide-black/10">
            {cartItem.Tickets.map((ticket, idx) => (
              <div key={ticket.id} className="px-6 py-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-purple-700">
                  Ticket {idx + 1}
                </p>
                <Label
                  htmlFor={`ticket-${ticket.id}`}
                  className="text-xs font-black uppercase tracking-wide"
                >
                  Ticket Holder Name
                </Label>
                <Input
                  id={`ticket-${ticket.id}`}
                  placeholder="e.g. Jane Smith"
                  value={localNames[ticket.id] || ""}
                  onChange={(e) => handleChange(ticket.id, e.target.value)}
                  className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="border-t-2 border-black bg-purple-50 px-6 py-4 space-y-4">
        <p className="text-xs text-gray-600">
          Please enter the name of the ticket holder for each ticket. This is required for entry to the event.
        </p>
        <button
          onClick={() => setCheckoutProgress("payment-page")}
          disabled={cart.length === 0}
          className="w-full bg-purple-700 text-white font-black text-sm uppercase tracking-wide py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_0px_#000]"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  )
}
