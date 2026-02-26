"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function EventsHeading() {
  const { language } = useLanguage();

  return (
    <section className="mb-8 rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {language === "cy" ? "Dyma beth sy'n dod i fyny" : "Here's what's coming up"}
      </h1>
      <p className="mt-3 text-gray-700 max-w-3xl">
        {language === "cy"
          ? "Porwch ein digwyddiadau CRhA i ddod, o weithgareddau teuluol i nosweithiau codi arian, a chadwch eich lle."
          : "Browse our upcoming PTA events, from family activities to fundraising nights, and reserve your place."}
      </p>
    </section>
  );
}
