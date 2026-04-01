import { Calendar, MapPin, Ticket } from "lucide-react";

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

function AvailabilityChip({ startDate, remainingCapacity }: { startDate: Date; remainingCapacity: number }) {
  if (startDate <= new Date()) {
    return <span className="bg-gray-200 text-gray-700 border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">Event Expired</span>;
  }
  if (remainingCapacity === 0) {
    return <span className="bg-red-500 text-white border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">Sold Out</span>;
  }
  if (remainingCapacity <= 10) {
    return <span className="bg-orange-400 text-black border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">Limited Tickets</span>;
  }
  return <span className="bg-green-500 text-white border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">Tickets Available</span>;
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
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-none border-2 border-black bg-purple-50 p-0 h-auto shadow-[4px_4px_0px_0px_#000]">
        <TabsTrigger
          value="details"
          className="rounded-none font-black text-xs uppercase tracking-wide border-r border-black data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none py-2.5"
        >
          Summary
        </TabsTrigger>
        <TabsTrigger
          value="location"
          className="rounded-none font-black text-xs uppercase tracking-wide data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none py-2.5"
        >
          Location
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-0">
        <div className="border-2 border-t-0 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
          <div className="bg-purple-100 border-b-2 border-black px-6 py-4">
            <p className="text-xs font-black uppercase tracking-widest text-purple-900 mb-3">Event details</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-700 text-white border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
                {new Intl.NumberFormat("en-GB", { currency: "GBP", style: "currency" }).format(price)}
              </span>
              <AvailabilityChip startDate={startDate} remainingCapacity={remainingCapacity} />
              <span className="bg-white text-black border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000] inline-flex items-center gap-1">
                <Ticket className="h-3 w-3" /> {remainingCapacity}/{capacity} left
              </span>
            </div>
          </div>

          <div className="px-6 py-4 space-y-2 border-b-2 border-black">
            <p className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <Calendar className="h-4 w-4 text-purple-600 shrink-0" />
              Starts: {new Date(startDate).toLocaleDateString("en-GB")} {new Date(startDate).toLocaleTimeString("en-GB")}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <Calendar className="h-4 w-4 text-purple-600 shrink-0" />
              Ends: {new Date(endDate).toLocaleDateString("en-GB")} {new Date(endDate).toLocaleTimeString("en-GB")}
            </p>
          </div>

          <div className="px-6 py-4 text-sm text-gray-800 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="location" className="mt-0">
        <div className="border-2 border-t-0 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
          <div className="bg-purple-100 border-b-2 border-black px-6 py-4">
            <p className="text-xs font-black uppercase tracking-widest text-purple-900">Event location</p>
          </div>
          <div className="px-6 py-4 flex items-start gap-2 text-sm text-gray-800 font-medium">
            <MapPin className="mt-0.5 h-4 w-4 text-purple-600 shrink-0" />
            <span>{location ?? ""}</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
