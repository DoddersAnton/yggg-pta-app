"use client"

import { useCartStore } from "@/lib/client-store"
import { AnimatePresence, motion } from "framer-motion"
import { useMemo } from "react"
import formatPrice from "@/lib/format-price"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import dynamic from "next/dynamic"
import emptyCart from "@/public/empty-box.json"
import { createId } from "@paralleldrive/cuid2"
import { useRouter } from "next/navigation"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function CartItems() {
  const { cart, addToCart, removeFromCart, setCheckoutProgress, setCartOpen } = useCartStore()
  const router = useRouter()

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cart])

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => ({ letter, id: createId() }))
  }, [totalPrice])

  const handleCheckout = () => {
    setCheckoutProgress("ticket-info")
    setCartOpen(false)
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Lottie className="h-48" animationData={emptyCart} />
        <p className="text-sm font-black uppercase tracking-wide text-gray-500 mt-2">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Items */}
      <div className="divide-y-2 divide-black border-2 border-black">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 bg-purple-50 px-4 py-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Event</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Price</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Image</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Qty</span>
        </div>

        {cart.map((item) => (
          <div key={item.id.toString()} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-4 py-3 bg-white hover:bg-purple-50 transition-colors">
            <span className="text-xs font-black uppercase tracking-tight truncate">{item.name}</span>
            <span className="text-xs font-semibold text-purple-700 whitespace-nowrap">{formatPrice(item.price)}</span>
            <div className="border-2 border-black overflow-hidden w-10 h-10 shrink-0">
              <Image
                width={40}
                height={40}
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart({ ...item, quantity: -1 })}
                className="flex items-center justify-center h-6 w-6 border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
                aria-label="Remove one"
              >
                <Minus size={10} />
              </button>
              <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="flex items-center justify-center h-6 w-6 border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
                aria-label="Add one"
              >
                <Plus size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-2 border-black bg-purple-50 px-4 py-3 shadow-[3px_3px_0px_0px_#000]">
        <span className="text-xs font-black uppercase tracking-widest">Total</span>
        <div className="flex items-center gap-0.5 font-black text-purple-700">
          <span className="text-sm">£</span>
          <AnimatePresence mode="popLayout">
            {priceInLetters.map((letter, i) => (
              <motion.span
                key={letter.id}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className="text-sm inline-block"
              >
                {letter.letter}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-purple-700 text-white font-black text-sm uppercase tracking-wide py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
      >
        Proceed to Checkout →
      </button>
    </div>
  )
}
