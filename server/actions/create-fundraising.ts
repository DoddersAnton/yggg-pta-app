"use server";

import { createSafeActionClient } from "next-safe-action";
import { FundraisingSchema } from "@/types/fundraising-schema";
import { db } from "..";
import { fundraising } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkRole } from "@/utils/roles";

const actionClient = createSafeActionClient();

export const createFundraising = actionClient
  .schema(FundraisingSchema)
  .action(async ({ parsedInput: { id, label, labelWel, type, year, amount } }) => {
    try {
      const isAdmin = await checkRole("admin");
      if (!isAdmin) return { error: "Unauthorised" };

      // amount comes in as pounds; store as pence
      const amountPence = Math.round(amount * 100);

      if (id) {
        const updated = await db
          .update(fundraising)
          .set({ label, labelWel: labelWel ?? null, type, year, amount: amountPence })
          .where(eq(fundraising.id, id))
          .returning();
        revalidatePath("/dashboard/fundraising");
        revalidatePath("/fundraising");
        return { success: `"${updated[0].label}" updated` };
      }

      const created = await db
        .insert(fundraising)
        .values({ label, labelWel: labelWel ?? null, type, year, amount: amountPence })
        .returning();
      revalidatePath("/dashboard/fundraising");
      revalidatePath("/fundraising");
      return { success: `"${created[0].label}" created` };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
