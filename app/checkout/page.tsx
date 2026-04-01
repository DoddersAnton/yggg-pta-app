"use client"

import { useCartStore } from "@/lib/client-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Check, CreditCard, TicketCheck } from "lucide-react"
import TicketInfo from "@/components/cart/add-ticket-info"
import Payment from "@/components/cart/payment"
import OrderConfirmed from "@/components/cart/order-confirmed"

const steps = [
  { key: "ticket-info", label: "Ticket Info", icon: TicketCheck },
  { key: "payment-page", label: "Payment", icon: CreditCard },
  { key: "confirmation-page", label: "Confirmed", icon: Check },
] as const

export default function CheckoutPage() {
  const { cart, checkoutProgress, setCheckoutProgress } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    if (cart.length === 0 && checkoutProgress !== "confirmation-page") {
      router.push("/events")
    }
  }, [cart, checkoutProgress, router])

  const currentStepIndex = steps.findIndex((s) => s.key === checkoutProgress)

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-3">
          <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
            Checkout
          </span>
          <h1 className="text-4xl font-black text-black uppercase leading-tight">
            {checkoutProgress === "ticket-info" && "Ticket Details"}
            {checkoutProgress === "payment-page" && "Payment"}
            {checkoutProgress === "confirmation-page" && "Order Confirmed"}
          </h1>
        </div>

        {/* Step progress */}
        <div className="flex items-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isActive = step.key === checkoutProgress
            const Icon = step.icon

            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className={`flex flex-1 items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wide transition-colors
                  ${isActive ? "bg-purple-700 text-white" : ""}
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-white text-gray-400" : ""}
                `}>
                  <Icon size={14} className="shrink-0" />
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-10 shrink-0 ${isCompleted ? "bg-green-500" : "bg-black/20"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Back link for ticket-info and payment steps */}
        {(checkoutProgress === "ticket-info" || checkoutProgress === "payment-page") && (
          <button
            onClick={() => {
              if (checkoutProgress === "ticket-info") router.push("/events")
              if (checkoutProgress === "payment-page") setCheckoutProgress("ticket-info")
            }}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-gray-600 hover:text-purple-700 transition-colors"
          >
            ← {checkoutProgress === "ticket-info" ? "Back to events" : "Back to ticket info"}
          </button>
        )}

        {/* Step content */}
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
          {checkoutProgress === "ticket-info" && <TicketInfo />}
          {checkoutProgress === "payment-page" && <Payment />}
          {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
        </div>
      </div>
    </main>
  )
}
