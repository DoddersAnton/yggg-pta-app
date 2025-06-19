import React, {  useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock fetchOrder function - replace with your actual data fetching logic
async function fetchOrder(orderId: number) {
    // Simulate API call
    return new Promise<{ id: number; tickets: { id: number; name: string; price: number }[] }>((resolve) =>
        setTimeout(
            () =>
                resolve({
                    id: orderId,
                    tickets: [
                        { id: 1, name: "Adult Ticket", price: 20 },
                        { id:  2, name: "Child Ticket", price: 10 },
                    ],
                }),
            500
        )
    );
}

type OrderSummaryPopupProps = {
    orderId: number; 
  
};

export const OrderSummaryPopup: React.FC<OrderSummaryPopupProps> = ({ orderId}) => {
    const [order, setOrder] = useState<{ id: number; tickets: { id: number; name: string; price: number }[] } | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <Dialog onOpenChange={() => fetchOrder(orderId).then(setOrder).finally(() => setLoading(false))}>
            <DialogTrigger asChild>
          <Button variant="outline">Review Order</Button>
        </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Summary</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" aria-label="Close">
                            ×
                        </Button>
                    </DialogClose>
                </DialogHeader>
                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : order ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Order #{order.id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                {order.tickets.map((ticket) => (
                                    <li key={ticket.id} className="flex justify-between py-2">
                                        <span>{ticket.name}</span>
                                        <span>£{ticket.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>
                                    £
                                    {order.tickets
                                        .reduce((sum, t) => sum + t.price, 0)
                                        .toFixed(2)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">No order found.</div>
                )}
            </DialogContent>
        </Dialog>
    );
};