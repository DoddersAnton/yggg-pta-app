"use server"

import { eq } from "drizzle-orm"
import { db } from ".."
import { events } from "../schema"

export async function getEvent(id: number) {
    try {
        const event = await db.query.events.findFirst({
          where: eq(events.id, id),
        })
        if (!event) throw new Error("Event not found")
        return { success: event }
      } catch (error) {
        console.error(error);
        return { error: "Failed to get event" }
      }
}