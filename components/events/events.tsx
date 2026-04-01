"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ActiveEvent } from "@/lib/infer-type";
import { useLanguage } from "../providers/language-provider";

interface EventProps {
  activeEvents: ActiveEvent[];
}

function availabilityChip(event: ActiveEvent, language: "en" | "cy") {
  if (event.startDate <= new Date()) {
    return (
      <span className="bg-gray-200 text-gray-700 border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
        {language === "cy" ? "Digwyddiad wedi dod i ben" : "Event Expired"}
      </span>
    );
  }
  if (event.remainingCapacity === 0) {
    return (
      <span className="bg-red-500 text-white border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
        {language === "cy" ? "Wedi gwerthu allan" : "Sold Out"}
      </span>
    );
  }
  if (event.remainingCapacity <= 10) {
    return (
      <span className="bg-orange-400 text-black border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
        {language === "cy" ? "Tocynnau cyfyngedig" : "Limited Tickets"}
      </span>
    );
  }
  return (
    <span className="bg-green-500 text-white border-2 border-black text-[10px] font-black uppercase tracking-wide px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
      {language === "cy" ? "Tocynnau ar gael" : "Tickets Available"}
    </span>
  );
}

export default function Events({ activeEvents }: EventProps) {
  const { language } = useLanguage();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          whileHover={{ x: -3, y: -3 }}
        >
          <Link href={`/events/${event.id}`} className="block border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] h-full">
            {/* Image */}
            <div className="relative w-full h-48 border-b-2 border-black overflow-hidden">
              <Image
                fill
                src={(language === "cy" ? event.imgUrlWel : event.imgUrl) ?? "/party.png"}
                alt={language === "cy" ? "delwedd digwyddiad" : "event image"}
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                {availabilityChip(event, language)}
              </div>
            </div>

            {/* Price strip */}
            <div className="bg-purple-700 border-b-2 border-black px-4 py-1.5">
              <span className="text-white font-black text-xs uppercase tracking-widest">
                {new Intl.NumberFormat("en-GB", { currency: "GBP", style: "currency" }).format(event.price)}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="font-black text-black text-base uppercase tracking-tight mb-3">{event.name}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(event.startDate).toLocaleDateString("en-GB")}
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-widest text-purple-700 border-b-2 border-purple-700 inline-block">
                {language === "cy" ? "Archebu →" : "Book now →"}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
