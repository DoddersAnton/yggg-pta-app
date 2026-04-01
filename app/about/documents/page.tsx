"use client";

import { FileText, Newspaper, Scale } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { MotionCard } from "@/components/ui/motion-card";

const placeholders = {
  en: [
    {
      title: "Governance documents",
      description: "Placeholder area for policies, constitutions, annual reports, and committee records.",
      icon: Scale,
      accent: "bg-purple-600",
    },
    {
      title: "Newsletters",
      description: "Placeholder area for PTA newsletters, school community updates, and fundraising summaries.",
      icon: Newspaper,
      accent: "bg-purple-700",
    },
    {
      title: "General documents",
      description: "Placeholder area for meeting notes, event packs, and other downloadable resources.",
      icon: FileText,
      accent: "bg-purple-800",
    },
  ],
  cy: [
    {
      title: "Dogfennau llywodraethu",
      description: "Ardal daliwr lle ar gyfer polisïau, cyfansoddiadau, adroddiadau blynyddol, a chofnodion pwyllgor.",
      icon: Scale,
      accent: "bg-purple-600",
    },
    {
      title: "Cylchlythyrau",
      description: "Ardal daliwr lle ar gyfer cylchlythyrau CRhA, diweddariadau cymuned ysgol, a chrynodebau codi arian.",
      icon: Newspaper,
      accent: "bg-purple-700",
    },
    {
      title: "Dogfennau cyffredinol",
      description: "Ardal daliwr lle ar gyfer nodiadau cyfarfodydd, pecynnau digwyddiadau, ac adnoddau i'w lawrlwytho.",
      icon: FileText,
      accent: "bg-purple-800",
    },
  ],
};

export default function AboutDocumentsPage() {
  const { language } = useLanguage();

  return (
    <main className="bg-purple-50 min-h-screen px-6 pb-16 pt-24">
      {/* Header */}
      <section className="mx-auto mb-12 max-w-6xl space-y-4">
        <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
          {language === "cy" ? "Dogfennau" : "Documents"}
        </span>
        <h1 className="text-5xl font-black text-black leading-tight">
          {language === "cy" ? "Adroddiadau a Dogfennau" : "Reports & Documents"}
        </h1>
        <p className="max-w-3xl text-base md:text-lg text-gray-800 border-l-4 border-purple-500 pl-4">
          {language === "cy"
            ? "Mae'r dudalen hon yn ddaliwr lle ar gyfer dogfennau llywodraethu, cylchlythyrau, a ffeiliau CRhA cysylltiedig."
            : "This page is a placeholder for governance documents, newsletters, and related PTA files."}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {placeholders[language].map((item, index) => (
          <MotionCard key={item.title} delay={index * 0.12}>
            <div className={`${item.accent} border-b-2 border-black px-6 py-4`}>
              <item.icon className="h-6 w-6 text-white" />
            </div>
            <div className="p-6">
              <h2 className="mb-2 text-base font-black uppercase tracking-tight">{item.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </MotionCard>
        ))}
      </section>
    </main>
  );
}
