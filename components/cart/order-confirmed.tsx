"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/client-store"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import orderConfirmed from "@/public/order-confirmed.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function OrderConfirmed() {
  const { setCheckoutProgress } = useCartStore()

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-10">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Lottie className="h-48" animationData={orderConfirmed} />
      </motion.div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black uppercase tracking-tight">Thank you!</h2>
        <p className="text-sm text-gray-600">Your order has been placed. You will receive a confirmation email shortly.</p>
      </div>

      <Link
        href="/dashboard/orders"
        onClick={() => setCheckoutProgress("cart-page")}
        className="inline-block bg-purple-700 text-white font-black text-sm uppercase tracking-wide px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
      >
        View your orders →
      </Link>
    </div>
  )
}
