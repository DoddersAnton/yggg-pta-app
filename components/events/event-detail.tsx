import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ActiveEvent } from "@/lib/infer-type";

import AddCart from "../cart/add-cart";
import EventInformation from "./event-information";

interface IEvent {
  activeEvent: ActiveEvent;
}

export default function EventDetail({ activeEvent }: IEvent) {
  return (
    <main className="bg-purple-50 min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          {" "}Back to events
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Image + title card */}
          <article className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
            <div className="relative h-72 w-full md:h-[28rem] border-b-2 border-black overflow-hidden">
              <Image
                fill
                src={activeEvent?.imgUrl ?? "/party.png"}
                alt="event image"
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-purple-800 border-b-2 border-black px-6 py-4">
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">{activeEvent?.name}</h1>
              <p className="mt-1 text-sm text-purple-200">
                Everything you need to know before booking your place.
              </p>
            </div>
          </article>

          {/* Info + booking */}
          <div className="space-y-6">
            <EventInformation
              price={activeEvent.price}
              location={activeEvent.location}
              description={activeEvent.description ?? ""}
              startDate={activeEvent.startDate}
              endDate={activeEvent.endDate}
              capacity={activeEvent.capacity}
              remainingCapacity={activeEvent.remainingCapacity}
            />

            <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
              <div className="bg-purple-600 border-b-2 border-black px-6 py-3">
                <h2 className="font-black text-white text-sm uppercase tracking-wide">Book tickets</h2>
              </div>
              <div className="p-5">
                <AddCart
                  id={activeEvent.id}
                  title={activeEvent.name}
                  price={activeEvent.price}
                  image={activeEvent.imgUrl ?? "/party.png"}
                  startDate={activeEvent.startDate}
                  remainingCapacity={activeEvent.remainingCapacity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
