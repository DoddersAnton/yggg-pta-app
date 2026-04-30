"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { fundraising } from "../schema";
import { db } from "..";
import { checkRole } from "@/utils/roles";

const actionClient = createSafeActionClient();

export const deleteFundraising = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const isAdmin = await checkRole("admin");
      if (!isAdmin) return { error: "Unauthorised" };

      const data = await db.delete(fundraising).where(eq(fundraising.id, id)).returning();
      revalidatePath("/dashboard/fundraising");
      revalidatePath("/fundraising");
      return { success: `"${data[0].label}" deleted` };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
