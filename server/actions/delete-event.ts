import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { events } from "../schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";



const actionClient = createSafeActionClient();

export const deleteEvent = actionClient
    .schema(z.object({ id: z.number() }))
    .action(async ({ parsedInput: { id } }) => {
      try {
        const data = await db
          .delete(events)
          .where(eq(events.id, id))
          .returning()
        revalidatePath("/dashboard/events")

        return { success: `Events ${data[0].name} has been deleted` }
      } catch (error) {
        return { error: `Failed to delete product. ${JSON.stringify(error)}` }
      }
    }
  )