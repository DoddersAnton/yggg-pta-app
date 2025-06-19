"use client"

import { useCartStore } from "@/lib/client-store"
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { Button } from "../ui/button"
import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createOrder } from "@/server/actions/create-order"
import { createPaymentIntent } from "@/server/actions/create-payment-intent"

export default function PaymentForm({ totalPrice }: { totalPrice: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, setCheckoutProgress, clearCart, setCartOpen } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

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
      toast.error(errorMessage)
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
      setErrorMessage("Failed to create payment intent. Please try again.");
      toast.error(errorMessage);
      setIsLoading(false);
      return;
    }

    if ("error" in (data?.data ?? {})) {
      setErrorMessage((data.data as { error: string }).error);
      setIsLoading(false);
      toast.error((data.data as { error: string }).error);
      return;
    }

      /*
    if (data?.error) {
      setErrorMessage(data.error)
      setIsLoading(false)
      toast.error(errorMessage)
     
      setCartOpen(false)
      return
    }*/

      if (data?.data && "success" in data.data) {
        const successData = (
        data.data as {
          success: {
            paymentIntentID: string;
            clientSecretID: string | null;
            user: string;
          };
        }
      ).success;
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
        toast.error(errorMessage)
        setIsLoading(false)
        return
      } else {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <Button
        className="my-4  w-full"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Processing..." : "Pay now"}
      </Button>
    </form>
  )
}
