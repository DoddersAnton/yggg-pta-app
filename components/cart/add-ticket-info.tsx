"use client"

import { useCartStore } from "@/lib/client-store"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"

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
      return <p className="text-muted-foreground">No tickets in cart</p>
    }
  
    return (
        <div className="space-y-6">
        {cart.map((cartItem) => (
          <div key={cartItem.id}>
            <h2 className="text-lg font-semibold mb-2 mx-auto max-w-md">{cartItem.name}</h2>
            <div className="space-y-4">
              {cartItem.Tickets.map((ticket, idx) => (
                <Card key={ticket.id} className="border shadow-sm mx-auto max-w-md">
                  <CardContent className="p-4 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">
                        Ticket {idx + 1}
                      </span>{" "}
                      • {ticket.title}
                    </div>
  
                    <div className="flex flex-col gap-1">
                      <Label htmlFor={`ticket-${ticket.id}`}>
                        Ticket Holder Name
                      </Label>
                      <Input
                        id={`ticket-${ticket.id}`}
                        placeholder="John Doe"
                        value={localNames[ticket.id] || ""}
                        onChange={(e) => handleChange(ticket.id, e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="my-6" />
          </div>
        ))}
        <div>
            <p className="text-muted-foreground text-sm mx-auto max-w-md">
                Please enter the name of the ticket holder for each ticket. This is important for entry to the event.
            </p>
        </div>
        <div className="flex items-center justify-between mx-auto">
        <Button
        onClick={() => {
          setCheckoutProgress("payment-page")
        }}
        className="mx-auto max-w-md w-full"
        disabled={cart.length === 0}
      >
        Pay
      </Button>
        </div>
          
      </div>
    )
}