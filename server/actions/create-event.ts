"use server";

import { createSafeActionClient } from "next-safe-action";
import { EventSchema } from "@/types/event-schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { events, users } from "../schema";

const actionClient = createSafeActionClient();
import { currentUser } from "@clerk/nextjs/server";

export const createEvent = actionClient
.schema(EventSchema)
.action(async ({ parsedInput: { name, description, id, price, capacity, startDate, endDate, location, image, imageWel } }) => {
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

      if (id) {
        const currentEvent = await db.query.events.findFirst({
          where: eq(events.id, id),
        });

        if (!currentEvent) return { error: "Event not found" };

        const editedEvent = await db
          .update(events)
          .set({ description, price, name, capacity, startDate, endDate, updatedBy: user.id, location, imgUrl: image ?? "/party.png", imgUrlWel: imageWel ?? "/party.png"  })
          .where(eq(events.id, id))
          .returning();

        revalidatePath("/dashboard/events");
        return { success: `Event ${editedEvent[0].name} has been updated` };
      }

      const newEvent = await db
        .insert(events)
        .values({
          name,
          price,
          capacity: capacity,
          startDate,
          endDate,
          location: location ?? "default location",
          remainingCapacity: capacity,
          createdBy: user.id,
          description,
          imgUrl: image ?? "/party.png", 
          imgUrlWel: imageWel ?? "/party.png" 
        })
        .returning();

      revalidatePath("/dashboard/events");
      return { success: `Event ${newEvent[0].name} has been created` };
    } catch (error) {
      console.error(error);
      return { error: JSON.stringify(error) };
    }
  }
);
