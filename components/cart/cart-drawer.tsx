"use client"

import { useCartStore } from "@/lib/client-store"
import { ShoppingBag } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { AnimatePresence, motion } from "framer-motion"
import CartItems from "./cart-items"

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen } = useCartStore()

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerTrigger asChild>
        <button className="relative px-2 text-white" aria-label="Open cart">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-0.5 flex h-4 w-4 items-center justify-center border-2 border-black bg-yellow-300 text-[9px] font-black text-black shadow-[1px_1px_0px_0px_#000]"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent className="rounded-none border-t-2 border-black shadow-[0_-4px_0px_0px_#000]">
        <DrawerHeader className="bg-purple-700 border-b-2 border-black px-6 py-4 text-left">
          <DrawerTitle className="text-white font-black text-base uppercase tracking-wide">
            Your Cart
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-auto p-4 max-h-[70vh]">
          <CartItems />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
