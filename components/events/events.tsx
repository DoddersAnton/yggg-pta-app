"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ActiveEvent } from "@/lib/infer-type";

import { useLanguage } from "../providers/language-provider";
import { Badge } from "../ui/badge";

interface EventProps {
  activeEvents: ActiveEvent[];
}

export default function Events({ activeEvents }: EventProps) {
  const { language } = useLanguage();

  return (
    <main className="py-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
        {activeEvents.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} className="block">
            <div className="border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 relative bg-white h-full">
              <div className="absolute top-2 right-2 shadow-md rounded-full">
                {event.startDate >= new Date() && event.remainingCapacity > 10 ? (
                  <Badge className="bg-green-500">{language === "cy" ? "Tocynnau ar gael" : "Tickets Available"}</Badge>
                ) : event.startDate >= new Date() && event.remainingCapacity > 0 ? (
                  <Badge className="bg-orange-500">{language === "cy" ? "Tocynnau cyfyngedig" : "Limited Tickets"}</Badge>
                ) : event.startDate >= new Date() && event.remainingCapacity === 0 ? (
                  <Badge className="bg-red-500">{language === "cy" ? "Wedi gwerthu allan" : "Sold Out"}</Badge>
                ) : event.startDate <= new Date() ? (
                  <Badge variant="secondary">{language === "cy" ? "Digwyddiad wedi dod i ben" : "Event Expired"}</Badge>
                ) : null}
              </div>
              <Image
                width={600}
                height={300}
                src={(language === "cy" ? event.imgUrlWel : event.imgUrl) ?? "/party.png"}
                alt={language === "cy" ? "delwedd digwyddiad" : "event image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
                <div className="flex-row flex items-center gap-2 justify-between">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar /> {new Date(event.startDate).toLocaleDateString("en-GB")}
                  </div>
                  <div className="text-sm text-gray-500">
                    <Badge>
                      {new Intl.NumberFormat("en-GB", {
                        currency: "GBP",
                        style: "currency",
                      }).format(event.price)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
