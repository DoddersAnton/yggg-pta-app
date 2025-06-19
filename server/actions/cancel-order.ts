import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { events, orders } from "../schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";



const actionClient = createSafeActionClient();

export const cancelOrder = actionClient
    .schema(z.object({ id: z.number() }))
    .action(async ({ parsedInput: { id } }) => {
      try {
        // Check if the event exists
        const existingOrder = await db.query.orders.findFirst({
            where: eq(orders.id, id),
            });

        if (!existingOrder) {
            return { error: `Order with ID ${id} does not exist.` };
            }

            //consider changing order status, change event remaining tickets, and update the order status to cancelled

        const data = await db
          .delete(events)
          .where(eq(events.id, id))
          .returning()
        revalidatePath("/dashboard/orders")

        return { success: `Order ${data[0].id} has been deleted` }
      } catch (error) {
        return { error: `Failed to delete order. ${JSON.stringify(error)}` }
      }
    }
  )