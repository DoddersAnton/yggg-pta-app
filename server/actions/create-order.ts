"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import {  orders, tickets, users } from "../schema";

const actionClient = createSafeActionClient();
import { currentUser } from "@clerk/nextjs/server";
import { createOrderSchema } from "@/types/create-order-schema";
import { eq } from "drizzle-orm";

export const createOrder  = actionClient
.schema(createOrderSchema)
.action(async ({ parsedInput: { orderTickets, status, total, paymentIntentID  } }) => {
    try {

      const user = await currentUser();
      
      if (!user) return { error: "User Not Found" };

      const requestUser = await db.query.users.findFirst({
              where: eq(users.id, user.id),
            });
      
        if (!requestUser) {
            
            if (user !== null) {
            const newUser = await db
                .insert(users)
                .values({
                id: user.id as string,
                email: user.emailAddresses[0].emailAddress ?? "unknown@example.com",
                name: user.fullName ?? "Unknown User",
                })
                .returning();
            console.log("New User Created", newUser);
            }
        }

      const order = await db
      .insert(orders)
      .values({
        status, // Ensure this field exists in the schema
        paymentIntentID,
        totalAmount: total, // Map 'total' to 'totalAmount' if that's the correct field name
        userId: user.id,
        totalTickets: orderTickets.reduce((acc, ticket) => acc + ticket.quantity, 0),
        createdAt: new Date(),
      })
      .returning();

      orderTickets.map(
        async ({ eventId, quantity, price, ticketHolderName }) => {
          await db.insert(tickets).values({
            eventId,
            orderId: order[0].id,
            quantity,
            price,
            ticketHolderName,
          })
        }
      )

    return { success: "Order has been added" };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Order has been added" };
  }
});
