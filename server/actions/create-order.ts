"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { events, orders, tickets, users } from "../schema";

const actionClient = createSafeActionClient();
import { currentUser } from "@clerk/nextjs/server";
import { createOrderSchema } from "@/types/create-order-schema";
import { eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ parsedInput: { orderTickets, status, total, paymentIntentID } }) => {
    try {
      const user = await currentUser();
      if (!user) return { error: "User Not Found" };

      const requestUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      });

      if (!requestUser) {
        await db.insert(users).values({
          id: user.id as string,
          email: user.emailAddresses[0].emailAddress ?? "unknown@example.com",
          name: user.fullName ?? "Unknown User",
        });
      }

      const orderRef = `PTA-ORD-${createId().slice(0, 6).toUpperCase()}`;

      const order = await db
        .insert(orders)
        .values({
          status,
          paymentIntentID,
          orderRef,
          totalAmount: total,
          userId: user.id,
          totalTickets: orderTickets.reduce((acc, ticket) => acc + ticket.quantity, 0),
          createdAt: new Date(),
        })
        .returning();

      // Insert tickets
      await Promise.all(
        orderTickets.map(({ eventId, price, ticketHolderName }) =>
          db.insert(tickets).values({
            eventId,
            orderId: order[0].id,
            quantity: 1,
            price,
            ticketHolderName,
            createdAt: new Date(),
          })
        )
      );

      // Decrement remainingCapacity for each event by the number of tickets sold
      const ticketsByEvent = orderTickets.reduce(
        (acc, t) => ({ ...acc, [t.eventId]: (acc[t.eventId] ?? 0) + t.quantity }),
        {} as Record<number, number>
      );

      await Promise.all(
        Object.entries(ticketsByEvent).map(([eventId, qty]) =>
          db
            .update(events)
            .set({ remainingCapacity: sql`GREATEST(${events.remainingCapacity} - ${qty}, 0)` })
            .where(eq(events.id, Number(eventId)))
        )
      );

      return { success: "Order has been added" };
    } catch (error) {
      console.error("Error creating order:", error);
      return { error: "Failed to create order" };
    }
  });
