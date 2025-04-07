import * as z from "zod";

export const EventSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(5, 
    {
      message: "Event name must be at least 5 characters long",
    }),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().optional(),
  capacity: z.coerce.number().positive(),
  image: z.string().optional(),
  imageWel: z.string().optional(),
  price: z.coerce.number().positive(),
});

export type zEventSchema = z.infer<typeof EventSchema>