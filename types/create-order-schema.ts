import * as z from "zod"

export const createOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  paymentIntentID: z.string(),
  orderTickets: z.array(
    z.object({
      eventId: z.number(),
      quantity: z.number(),
      ticketHolderName: z.string().optional(),
      price: z.number(),
    })
  ),
})