"use server"

import { eq } from "drizzle-orm"
import { db } from ".."
import { orders } from "../schema"

export async function getOrder(orderId: number) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        orderTickets: {
          with: {
            event: true,
          },
        },
      },
    })
    if (!order) return { error: "Order not found" }
    return { success: order }
  } catch (error) {
    console.error(error)
    return { error: "Failed to fetch order" }
  }
}
