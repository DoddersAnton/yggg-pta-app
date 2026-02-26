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
    <section className="container mx-auto px-6 py-24">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="relative h-72 w-full md:h-[28rem]">
            <Image
              fill
              src={activeEvent?.imgUrl ?? "/party.png"}
              alt="event image"
              className="object-cover"
              priority
            />
          </div>
          <div className="border-t bg-gradient-to-r from-purple-50 to-white p-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{activeEvent?.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know before booking your place.
            </p>
          </div>
        </article>

        <div className="space-y-5">
          <EventInformation
            price={activeEvent.price}
            location={activeEvent.location}
            description={activeEvent.description ?? ""}
            startDate={activeEvent.startDate}
            endDate={activeEvent.endDate}
            capacity={activeEvent.capacity}
            remainingCapacity={activeEvent.remainingCapacity}
          />

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Book tickets</h2>
            <AddCart
              id={activeEvent.id}
              title={activeEvent.name}
              price={activeEvent.price}
              image={activeEvent.imgUrl ?? "/party.png"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
