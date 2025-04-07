import { integer, pgTable, serial, timestamp, varchar,  real } from "drizzle-orm/pg-core";



export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    location: varchar("location", { length: 255 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    price: real("price").notNull(), 
    capacity: integer("capacity").notNull().default(0),
    remainingCapacity: integer("remaining_capacity").notNull().default(0),
    createdOn: timestamp("created_on").defaultNow(),
    createdBy: varchar("created_by", { length: 255 }).notNull().references(() => users.id),
    updatedBy: varchar("updated_by", { length: 255 }).references(() => users.id),
    imgUrl: varchar("img_url_eng", { length: 255 }),
    imgUrlWel: varchar("img_url_wel", { length: 255 }),
  });

  export const users = pgTable("users", {
    id: varchar("id", { length: 255 }).primaryKey(), // Clerk User ID
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  });

  export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
    status: varchar("status", { length: 50 }).default("pending"), // "pending", "paid", "cancelled"
    totalAmount: real("total_amount").default(0.00), // Sum of ticket prices
    totalTickets: integer("total_tickets").default(0), // Sum of ticket quantities
    createdAt: timestamp("created_at").defaultNow(),
  });

  export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    eventId: integer("event_id").notNull().references(() => events.id),
    quantity: integer("quantity").notNull().default(1),
    price: integer("price").notNull(), // Store price at time of purchase
    createdAt: timestamp("created_at").defaultNow(),
  });