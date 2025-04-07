'use client'

import { ActiveEvent } from "@/lib/infer-type"
import  Image  from "next/image"
import { useLanguage } from "../providers/language-provider";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";



interface Event {
    activeEvents: ActiveEvent[]
}

export default function Events({activeEvents}: Event) {

    const { language } = useLanguage();

    return (
        <main className="py-12 grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
            <div>
                {activeEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`} className="block">
                        <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                            <div className="absolute top-2 right-2 shadow-md rounded-full">
                                {event.startDate >= new Date() && event.remainingCapacity > 0 && event.remainingCapacity > 10 ? (
                                    <Badge className="bg-green-500">Tickets Available</Badge>
                                ) : event.startDate >= new Date() && event.remainingCapacity > 0 && event.remainingCapacity < 10 ? (
                                    <Badge className="bg-orange-500">Limited Tickets</Badge>
                                ) : event.startDate >= new Date() && event.remainingCapacity === 0 ? (
                                    <Badge className="bg-red-500">Sold Out</Badge>
                                ) : event.startDate <= new Date() ? (
                                    <Badge variant={"secondary"}>Event Expired</Badge>
                                ) : null}
                            </div>
                            <Image
                                width={600}
                                height={300}
                                src={(language === "cy" ? event.imgUrlWel : event.imgUrl) ?? "/party.png"}
                                alt="event image"
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
                                { new Intl.NumberFormat("en-GB", { currency: "GBP",
                                        style: "currency"}).format(event.price)}
                                        </Badge>
                            </div>

                            </div>
                            
                        </div>
                    </div>
                </Link>
            ))}
           
        </div>
        </main>
    )
}