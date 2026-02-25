"use server";

import { createSafeActionClient } from "next-safe-action";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { paymentIntentSchema } from "@/types/payment-intent-schema";
import { db } from "..";
import { users } from "../schema";

const actionClient = createSafeActionClient();

export const createPaymentIntent = actionClient
  .schema(paymentIntentSchema)
  .action(async ({ parsedInput: { amount, cart, currency } }) => {
    const stripeSecret = process.env.STRIPE_SECRET;

    if (!stripeSecret) {
      return { error: "Stripe is not configured. Please set STRIPE_SECRET." };
    }

    const user = await currentUser();
    if (!user) return { error: "Please login to continue" };
    if (!amount) return { error: "No Product to checkout" };

    const requestUser = await db.query.users.findFirst({
      where: eq(users.id, user.id),
    });

    if (!requestUser) {
      const newUser = await db
        .insert(users)
        .values({
          id: user.id,
          email: user.emailAddresses[0].emailAddress ?? "unknown@example.com",
          name: user.fullName ?? "Unknown User",
        })
        .returning();
      console.log("New User Created", newUser);
    }

    const stripe = new Stripe(stripeSecret);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Event Ticket Purchase",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    return {
      success: {
        paymentIntentID: paymentIntent.id,
        clientSecretID: paymentIntent.client_secret,
        user: user.emailAddresses[0].emailAddress ?? "unknown@example.com",
      },
    };
  });
