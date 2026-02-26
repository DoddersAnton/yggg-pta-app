import { Calendar, MapPin, Ticket } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface IEventInformation {
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  location: string;
  remainingCapacity: number;
  capacity: number;
}

export default function EventInformation({
  price,
  description,
  startDate,
  endDate,
  remainingCapacity,
  location,
  capacity,
}: IEventInformation) {
  const availabilityBadge =
    startDate >= new Date() && remainingCapacity > 10 ? (
      <Badge className="bg-green-500">Tickets Available</Badge>
    ) : startDate >= new Date() && remainingCapacity > 0 ? (
      <Badge className="bg-orange-500">Limited Tickets</Badge>
    ) : startDate >= new Date() && remainingCapacity === 0 ? (
      <Badge className="bg-red-500">Sold Out</Badge>
    ) : (
      <Badge variant="secondary">Event Expired</Badge>
    );

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Summary</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card className="border-purple-100">
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl">Event details</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                {new Intl.NumberFormat("en-GB", {
                  currency: "GBP",
                  style: "currency",
                }).format(price)}
              </Badge>
              {availabilityBadge}
              <Badge variant="outline" className="inline-flex items-center gap-1">
                <Ticket className="h-3.5 w-3.5" /> {remainingCapacity}/{capacity} left
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Starts: {new Date(startDate).toLocaleDateString("en-GB")} {new Date(startDate).toLocaleTimeString("en-GB")}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Ends: {new Date(endDate).toLocaleDateString("en-GB")} {new Date(endDate).toLocaleTimeString("en-GB")}
                </span>
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-6 text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
            </CardDescription>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="location">
        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="text-xl">Event location</CardTitle>
            <CardDescription className="inline-flex items-start gap-2 pt-2 text-sm text-gray-700">
              <MapPin className="mt-0.5 h-4 w-4" />
              <span>{location ?? ""}</span>
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
