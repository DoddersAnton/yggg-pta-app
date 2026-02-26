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
    },
    {
      title: "Newsletters",
      description: "Placeholder area for PTA newsletters, school community updates, and fundraising summaries.",
      icon: Newspaper,
    },
    {
      title: "General documents",
      description: "Placeholder area for meeting notes, event packs, and other downloadable resources.",
      icon: FileText,
    },
  ],
  cy: [
    {
      title: "Dogfennau llywodraethu",
      description: "Ardal daliwr lle ar gyfer polisïau, cyfansoddiadau, adroddiadau blynyddol, a chofnodion pwyllgor.",
      icon: Scale,
    },
    {
      title: "Cylchlythyrau",
      description: "Ardal daliwr lle ar gyfer cylchlythyrau CRhA, diweddariadau cymuned ysgol, a chrynodebau codi arian.",
      icon: Newspaper,
    },
    {
      title: "Dogfennau cyffredinol",
      description: "Ardal daliwr lle ar gyfer nodiadau cyfarfodydd, pecynnau digwyddiadau, ac adnoddau i'w lawrlwytho.",
      icon: FileText,
    },
  ],
};

export default function AboutDocumentsPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen px-6 pb-12 pt-24">
      <section className="mx-auto mb-8 max-w-6xl space-y-3">
        <h1 className="text-4xl font-extrabold">{language === "cy" ? "Adroddiadau a Dogfennau" : "Reports & Documents"}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {language === "cy"
            ? "Mae'r dudalen hon yn ddaliwr lle ar gyfer dogfennau llywodraethu, cylchlythyrau, a ffeiliau CRhA cysylltiedig."
            : "This page is a placeholder for governance documents, newsletters, and related PTA files."}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {placeholders[language].map((item) => (
          <MotionCard key={item.title}>
            <item.icon className="mb-3 h-7 w-7 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </MotionCard>
        ))}
      </section>
    </main>
  );
}
