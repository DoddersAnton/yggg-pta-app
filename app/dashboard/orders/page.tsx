import { db } from "@/server";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { OrderDataTable } from "./order-data-table";
import { OrderColumn, orderColumns } from "./order-columns";

export default async function Events() {

     const session = await auth();
      
        if (!session) redirect("/")

    const userId = session.userId;

    if (!userId) redirect("/");

    const orders =  await db.query.orders.findMany({
            where: (orders, { eq }) => eq(orders.userId, userId),
            orderBy: (orders, { desc }) => [desc(orders.id)],
        });

        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, userId)
        });

          //id: number; status: string; user: string; totalTickets: number; totalAmount: number; paymentRef: string; orderDate: Date;

          const orderData: OrderColumn[] = orders.map((order) => {
            return {
                id: order.id,
                status: order.status ?? "Pending",
                user: user?.name ?? "Unknown User",
                totalTickets: order.totalTickets ?? 0,
                totalAmount: order.totalAmount ?? 0,
                paymentRef: order.paymentIntentID ?? "",
                orderDate: order.createdAt ?? new Date(),
            };
          });

    return (
        <div className="mx-auto w-full p-2 lg:w-[80%]">
             <OrderDataTable columns={orderColumns} data={orderData} />
        </div>
    );
}