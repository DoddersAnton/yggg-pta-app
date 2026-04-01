"use client"

import { useCartStore } from "@/lib/client-store"
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { createOrder } from "@/server/actions/create-order"
import { createPaymentIntent } from "@/server/actions/create-payment-intent"

export default function PaymentForm({ totalPrice }: { totalPrice: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, setCheckoutProgress, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      if (data?.data?.error) {
        toast.error(data.data?.error)
      }
      if (data?.data?.success) {
        setIsLoading(false)
        toast.success(data.data?.success)
        setCheckoutProgress("confirmation-page")
        clearCart()
      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      setIsLoading(false)
      return
    }
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message!)
      toast.error(submitError.message)
      setIsLoading(false)
      return
    }
    const data = await createPaymentIntent({
      amount: totalPrice * 100,
      currency: "gbp",
      cart: cart.map((item) => ({
        eventId: item.eventId,
        quantity: item.quantity,
        title: item.name,
        price: item.price,
        image: item.image,
      })),
    })

    if (data == undefined) {
      setErrorMessage("Failed to create payment intent. Please try again.")
      toast.error("Failed to create payment intent. Please try again.")
      setIsLoading(false)
      return
    }

    if ("error" in (data?.data ?? {})) {
      const msg = (data.data as { error: string }).error
      setErrorMessage(msg)
      toast.error(msg)
      setIsLoading(false)
      return
    }

    if (data?.data && "success" in data.data) {
      const successData = (
        data.data as {
          success: { paymentIntentID: string; clientSecretID: string | null; user: string }
        }
      ).success

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: successData.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: successData.user as string,
        },
      })

      if (error) {
        setErrorMessage(error.message!)
        toast.error(error.message)
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      execute({
        status: "pending",
        paymentIntentID: successData.paymentIntentID,
        total: totalPrice,
        orderTickets: cart.flatMap((item) =>
          item.Tickets.map((ticket) => ({
            eventId: item.eventId,
            price: ticket.price,
            quantity: 1,
            ticketHolderName: ticket.ticketHolderName,
          }))
        ),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />

      {errorMessage && (
        <p className="text-xs font-black text-red-600 uppercase tracking-wide border-2 border-red-500 bg-red-50 px-3 py-2">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full bg-purple-700 text-white font-black text-sm uppercase tracking-wide py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_0px_#000]"
      >
        {isLoading ? "Processing…" : "Pay Now"}
      </button>
    </form>
  )
}
