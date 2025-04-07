import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

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
  location
}: IEventInformation) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Summary</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Card className="m-h-24">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardTitle>
              <Badge>
                {new Intl.NumberFormat("en-GB", {
                  currency: "GBP",
                  style: "currency",
                }).format(price)}
              </Badge>
              {startDate >= new Date() &&
              remainingCapacity > 0 &&
              remainingCapacity > 10 ? (
                <Badge className="bg-green-500">Tickets Available</Badge>
              ) : startDate >= new Date() &&
                remainingCapacity > 0 &&
                remainingCapacity < 10 ? (
                <Badge className="bg-orange-500">Limited Tickets</Badge>
              ) : startDate >= new Date() && remainingCapacity === 0 ? (
                <Badge className="bg-red-500">Sold Out</Badge>
              ) : startDate <= new Date() ? (
                <Badge variant={"secondary"}>Event Expired</Badge>
              ) : null}
            </CardTitle>
            <Separator />
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar /> Starts at:{" "}
              {new Date(startDate).toLocaleDateString("en-GB")}{" "}
              {new Date(startDate).toLocaleTimeString("en-GB")}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar /> Ends at:{" "}
              {new Date(endDate).toLocaleDateString("en-GB")}{" "}
              {new Date(endDate).toLocaleTimeString("en-GB")}
            </div>
            <Separator />
            <CardDescription>
              <div
                dangerouslySetInnerHTML={{ __html: description ?? "" }}
              ></div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="location">
        <Card>
          <CardHeader className="h-full">
            <CardTitle>Event Location</CardTitle>
            <CardDescription>
              {location ?? ""}
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
