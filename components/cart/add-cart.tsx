"use client"

import { useCartStore } from "@/lib/client-store"
import { useState } from "react"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { toast } from "sonner"
import { redirect } from "next/navigation"


interface ICardProps {
    id: number
    title: string
    price: number
    image: string
}

export default function AddCart({id, title, price, image}: ICardProps) {
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  if (!id || !title || !price || !image) {
    toast.error("Event not found")
    return redirect("/")
  }
  return (
    <>
    <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4 justify-stretch my-4">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1)
            }
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button variant={"secondary"} className="flex-1">
          Quantity: {quantity}
        </Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1)
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <div>
     <Button className="w-full"
        onClick={() => {
          toast.success(`Added event ${title} to your cart!`)
          addToCart({
            id: id,
            name: title,
            price,
            image,
            quantity,
          })
        }}
      >
        Add to cart
      </Button>
     </div>
    </div>
     
      
    </>
  )
}