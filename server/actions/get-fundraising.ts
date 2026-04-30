"use server";

import { db } from "..";
import { fundraising } from "../schema";
import { asc } from "drizzle-orm";

export async function getFundraising() {
  try {
    const data = await db.query.fundraising.findMany({
      orderBy: [asc(fundraising.year), asc(fundraising.type), asc(fundraising.label)],
    });
    return { success: data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch fundraising data" };
  }
}
