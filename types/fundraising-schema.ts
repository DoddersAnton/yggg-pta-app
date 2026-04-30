import * as z from "zod";

export const FundraisingSchema = z.object({
  id: z.number().optional(),
  label: z.string().min(2, { message: "Label must be at least 2 characters" }),
  type: z.enum(["income", "expenditure"]),
  year: z.coerce.number().int().min(2020).max(2035),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
});

export type zFundraisingSchema = z.infer<typeof FundraisingSchema>;
