import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/server";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

export default async function AnalyticsPage() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) redirect("/dashboard/orders");

  const [events, orders, tickets] = await Promise.all([
    db.query.events.findMany(),
    db.query.orders.findMany({
      with: { user: true },
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    }),
    db.query.tickets.findMany({
      with: {
        event: true,
        order: { with: { user: true } },
      },
      orderBy: (tickets, { desc }) => [desc(tickets.createdAt)],
    }),
  ]);

  const totalEvents = events.length;
  const totalIncome = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
  const totalTickets = tickets.reduce((sum, t) => sum + (t.quantity ?? 0), 0);

  const monthBuckets = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    monthBuckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }
  for (const order of orders) {
    if (!order.createdAt || order.status !== "paid") continue;
    const key = `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}`;
    if (monthBuckets.has(key))
      monthBuckets.set(key, (monthBuckets.get(key) ?? 0) + (order.totalAmount ?? 0));
  }
  const monthlyIncome = Array.from(monthBuckets.entries()).map(([key, amount]) => {
    const [year, month] = key.split("-").map(Number);
    return { label: new Date(year, month, 1).toLocaleString("en-GB", { month: "short" }), amount };
  });
  const maxMonthly = Math.max(...monthlyIncome.map((m) => m.amount), 1);

  const eventTickets = new Map<string, number>();
  for (const ticket of tickets) {
    const name = ticket.event?.name ?? "Unknown event";
    eventTickets.set(name, (eventTickets.get(name) ?? 0) + (ticket.quantity ?? 0));
  }
  const ticketsByEvent = Array.from(eventTickets.entries())
    .map(([eventName, quantity]) => ({ eventName, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  const maxEventTickets = Math.max(...ticketsByEvent.map((t) => t.quantity), 1);

  const recentRows = tickets.slice(0, 12);

  const statCards = [
    { label: "Total events", value: totalEvents },
    { label: "Total income", value: formatCurrency(totalIncome) },
    { label: "Total tickets", value: totalTickets },
  ];

  const accentColors = ["bg-purple-600", "bg-purple-700", "bg-purple-800"];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {statCards.map((card, i) => (
          <div key={card.label} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
            <div className={`${accentColors[i]} border-b-2 border-black px-5 py-3`}>
              <p className="text-xs font-black text-white uppercase tracking-widest">{card.label}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-3xl font-black text-black">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
          <div className="bg-purple-700 border-b-2 border-black px-5 py-3">
            <p className="text-xs font-black text-white uppercase tracking-widest">Income — last 6 months</p>
            <p className="text-[10px] text-purple-200 mt-0.5">Monthly paid revenue</p>
          </div>
          <div className="p-5">
            <div className="grid h-48 grid-cols-6 items-end gap-2">
              {monthlyIncome.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-36 w-full items-end border-2 border-black bg-purple-50 p-0.5">
                    <div
                      className="w-full bg-purple-700"
                      style={{ height: `${Math.max((item.amount / maxMonthly) * 100, item.amount > 0 ? 8 : 2)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top events */}
        <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
          <div className="bg-purple-800 border-b-2 border-black px-5 py-3">
            <p className="text-xs font-black text-white uppercase tracking-widest">Top events by tickets</p>
            <p className="text-[10px] text-purple-200 mt-0.5">Most purchased events</p>
          </div>
          <div className="p-5 space-y-4">
            {ticketsByEvent.length === 0 ? (
              <p className="text-sm text-gray-500 font-medium">No ticket data yet.</p>
            ) : (
              ticketsByEvent.map((item) => (
                <div key={item.eventName} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="truncate pr-2 uppercase">{item.eventName}</span>
                    <span className="text-purple-700">{item.quantity}</span>
                  </div>
                  <div className="h-3 border-2 border-black bg-purple-50">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${Math.max((item.quantity / maxEventTickets) * 100, 5)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent tickets table */}
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
        <div className="bg-purple-600 border-b-2 border-black px-5 py-3">
          <p className="text-xs font-black text-white uppercase tracking-widest">Tickets / Orders</p>
          <p className="text-[10px] text-purple-200 mt-0.5">Recent ticket purchases</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-black bg-purple-50 hover:bg-purple-50">
                {["Order ID", "Customer", "Event", "Status", "Qty", "Amount", "Date"].map((h) => (
                  <TableHead key={h} className="text-xs font-black uppercase tracking-wide text-black border-r border-black last:border-r-0">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-gray-500 py-8">
                    No orders yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentRows.map((ticket) => (
                  <TableRow key={ticket.id} className="border-b border-black/20 hover:bg-purple-50">
                    <TableCell className="text-xs font-semibold">#{ticket.orderId}</TableCell>
                    <TableCell className="text-xs">{ticket.order?.user?.name ?? "Unknown"}</TableCell>
                    <TableCell className="text-xs">{ticket.event?.name ?? "Unknown event"}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] ${
                        ticket.order?.status === "paid"
                          ? "bg-green-500 text-white"
                          : ticket.order?.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {ticket.order?.status ?? "pending"}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-semibold">{ticket.quantity}</TableCell>
                    <TableCell className="text-xs font-semibold">{formatCurrency((ticket.price ?? 0) * (ticket.quantity ?? 0))}</TableCell>
                    <TableCell className="text-xs">{formatDate(ticket.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
