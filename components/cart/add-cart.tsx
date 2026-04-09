"use client"

import { useCartStore } from "@/lib/client-store"
import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { toast } from "sonner"
import { createId } from "@paralleldrive/cuid2"

interface ICardProps {
  id: number
  title: string
  price: number
  image: string
  startDate: Date
  remainingCapacity: number
}

export default function AddCart({ id, title, price, image, startDate, remainingCapacity }: ICardProps) {
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  const isExpired = new Date(startDate) < new Date()
  const isSoldOut = remainingCapacity === 0

  if (isExpired) {
    return (
      <div className="border-2 border-black bg-gray-100 px-4 py-3 shadow-[3px_3px_0px_0px_#000]">
        <p className="text-xs font-black uppercase tracking-wide text-gray-500">This event has ended</p>
      </div>
    )
  }

  if (isSoldOut) {
    return (
      <div className="border-2 border-black bg-red-50 px-4 py-3 shadow-[3px_3px_0px_0px_#000]">
        <p className="text-xs font-black uppercase tracking-wide text-red-600">Sold out</p>
      </div>
    )
  }

  const maxQuantity = remainingCapacity

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-0 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex items-center justify-center h-10 w-10 border-r-2 border-black bg-purple-50 hover:bg-purple-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={14} strokeWidth={3} />
        </button>
        <span className="flex-1 text-center text-sm font-black py-2">
          {quantity} ticket{quantity !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
          className="flex items-center justify-center h-10 w-10 border-l-2 border-black bg-purple-50 hover:bg-purple-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>

      {remainingCapacity <= 10 && (
        <p className="text-[10px] font-black uppercase tracking-wide text-orange-600">
          Only {remainingCapacity} ticket{remainingCapacity !== 1 ? "s" : ""} remaining
        </p>
      )}

      <button
        onClick={() => {
          toast.success(`Added ${quantity} ticket${quantity !== 1 ? "s" : ""} for ${title} to your cart!`)
          addToCart({
            id: createId(),
            eventId: id,
            name: title,
            price,
            image,
            quantity,
            Tickets: [],
          })
        }}
        className="w-full bg-purple-700 text-white font-black text-sm uppercase tracking-wide py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
      >
        Add to cart
      </button>
    </div>
  )
}
