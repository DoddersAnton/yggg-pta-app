import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(date);
}

export default async function AnalyticsPage() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) redirect("/dashboard/settings");

  const [events, orders, tickets] = await Promise.all([
    db.query.events.findMany(),
    db.query.orders.findMany({
      with: {
        user: true,
      },
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    }),
    db.query.tickets.findMany({
      with: {
        event: true,
        order: {
          with: {
            user: true,
          },
        },
      },
      orderBy: (tickets, { desc }) => [desc(tickets.createdAt)],
    }),
  ]);

  const totalEvents = events.length;
  const totalIncome = orders
    .filter((order) => order.status === "paid")
    .reduce((total, order) => total + (order.totalAmount ?? 0), 0);
  const totalTickets = tickets.reduce((total, ticket) => total + (ticket.quantity ?? 0), 0);

  const monthBuckets = new Map<string, number>();

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    monthBuckets.set(key, 0);
  }

  for (const order of orders) {
    if (!order.createdAt || order.status !== "paid") continue;

    const key = `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}`;

    if (!monthBuckets.has(key)) continue;

    monthBuckets.set(key, (monthBuckets.get(key) ?? 0) + (order.totalAmount ?? 0));
  }

  const monthlyIncome = Array.from(monthBuckets.entries()).map(([key, amount]) => {
    const [year, month] = key.split("-").map(Number);
    const labelDate = new Date(year, month, 1);

    return {
      label: labelDate.toLocaleString("en-GB", { month: "short" }),
      amount,
    };
  });

  const maxMonthlyIncome = Math.max(...monthlyIncome.map((item) => item.amount), 1);

  const eventTickets = new Map<string, number>();

  for (const ticket of tickets) {
    const eventName = ticket.event?.name ?? "Unknown event";

    eventTickets.set(eventName, (eventTickets.get(eventName) ?? 0) + (ticket.quantity ?? 0));
  }

  const ticketsByEvent = Array.from(eventTickets.entries())
    .map(([eventName, quantity]) => ({ eventName, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const maxEventTickets = Math.max(...ticketsByEvent.map((item) => item.quantity), 1);

  const recentRows = tickets.slice(0, 12);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-2 lg:p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total events</CardDescription>
            <CardTitle className="text-3xl">{totalEvents}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total income</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalIncome)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total tickets</CardDescription>
            <CardTitle className="text-3xl">{totalTickets}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income (last 6 months)</CardTitle>
            <CardDescription>Monthly paid revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid h-52 grid-cols-6 items-end gap-3">
              {monthlyIncome.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end rounded-md bg-muted/40 p-1">
                    <div
                      className="w-full rounded-sm bg-primary"
                      style={{
                        height: `${Math.max((item.amount / maxMonthlyIncome) * 100, item.amount > 0 ? 8 : 2)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top events by tickets</CardTitle>
            <CardDescription>Most purchased events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ticketsByEvent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ticket data yet.</p>
            ) : (
              ticketsByEvent.map((item) => (
                <div key={item.eventName} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">{item.eventName}</span>
                    <span className="text-muted-foreground">{item.quantity}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.max((item.quantity / maxEventTickets) * 100, 5)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets / Orders</CardTitle>
          <CardDescription>Recent ticket purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No orders yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentRows.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.orderId}</TableCell>
                    <TableCell>{ticket.order?.user?.name ?? "Unknown"}</TableCell>
                    <TableCell>{ticket.event?.name ?? "Unknown event"}</TableCell>
                    <TableCell className="capitalize">{ticket.order?.status ?? "pending"}</TableCell>
                    <TableCell>{ticket.quantity}</TableCell>
                    <TableCell>{formatCurrency((ticket.price ?? 0) * (ticket.quantity ?? 0))}</TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
