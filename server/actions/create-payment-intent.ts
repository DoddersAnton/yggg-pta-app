"use server"

import { createSafeActionClient } from "next-safe-action"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET!)
const actionClient = createSafeActionClient();
import { currentUser } from "@clerk/nextjs/server";
import { paymentIntentSchema } from "@/types/payment-intent-schema";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";


export const createPaymentIntent  = actionClient
.schema(paymentIntentSchema)
.action(async ({ parsedInput: {  amount, cart, currency  } }) => {

    const user = await currentUser();
    if (!user) return { error: "Please login to continue" }
    if (!amount) return { error: "No Product to checkout" }

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

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Event Ticket Purchase",
      //customer: user.emailAddresses[0].emailAddress ?? "",
      automatic_payment_methods: {
        enabled: true,
      },

      metadata: {
        cart: JSON.stringify(cart),
      },
    })
    return {
      success: {
        paymentIntentID: paymentIntent.id,
        clientSecretID: paymentIntent.client_secret,
        user: user.emailAddresses[0].emailAddress ?? "unknown@example.com",
      },
    }
  }
)