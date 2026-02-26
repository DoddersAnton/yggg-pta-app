"use client";

import Link from "next/link";
import { ArrowRight, Goal, HandHeart, Wrench } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { MotionCard } from "@/components/ui/motion-card";

const priorities = {
  en: [
    {
      title: "Outdoor play equipment refresh",
      detail:
        "We are raising funds for durable playground pieces and safer surfacing so children can stay active all year.",
      icon: Goal,
    },
    {
      title: "Classroom technology upgrades",
      detail:
        "Planned purchases include new tablets, charging stations, and interactive tools to support digital learning.",
      icon: Wrench,
    },
    {
      title: "Enrichment and wellbeing programmes",
      detail:
        "From visiting workshops to after-school experiences, we want every year group to access memorable opportunities.",
      icon: HandHeart,
    },
  ],
  cy: [
    {
      title: "Adnewyddu offer chwarae awyr agored",
      detail:
        "Rydym yn codi arian ar gyfer offer maes chwarae gwydn ac arwyneb mwy diogel fel bod plant yn gallu aros yn egnïol drwy'r flwyddyn.",
      icon: Goal,
    },
    {
      title: "Uwchraddio technoleg dosbarth",
      detail:
        "Mae'r cynlluniau'n cynnwys tabledi newydd, gorsafoedd gwefru, ac offer rhyngweithiol i gefnogi dysgu digidol.",
      icon: Wrench,
    },
    {
      title: "Rhaglenni cyfoethogi a lles",
      detail:
        "O weithdai ymweliadol i brofiadau ar ôl ysgol, rydym eisiau i bob blwyddyn gael cyfleoedd cofiadwy.",
      icon: HandHeart,
    },
  ],
};

export default function FundraisingPage() {
  const { language } = useLanguage();

  return (
    <main className="pt-28 pb-14 px-6 bg-gradient-to-b from-purple-100 via-purple-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-2xl border border-purple-200 bg-white/80 p-8 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-purple-700 font-semibold">
            {language === "cy" ? "Codi Arian" : "Fundraising"}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            {language === "cy" ? "Beth rydym yn codi arian ar ei gyfer ar hyn o bryd" : "What we are currently raising money for"}
          </h1>
          <p className="mt-4 text-gray-700 max-w-3xl">
            {language === "cy"
              ? "Mae pob ymgyrch codi arian yn gysylltiedig ag angen ymarferol yn yr ysgol. Y blaenoriaethau isod yw ein ffocws presennol a dyma lle mae eich cyfraniadau'n gwneud y gwahaniaeth mwyaf."
              : "Every fundraising campaign is linked to a practical need in school. The priorities below are our current focus and where your donations make the biggest difference."}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {priorities[language].map((priority) => (
            <MotionCard key={priority.title}>
              <priority.icon className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">{priority.title}</h2>
              <p className="text-sm text-muted-foreground">{priority.detail}</p>
            </MotionCard>
          ))}
        </section>

        <section className="rounded-2xl bg-purple-50 border border-purple-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {language === "cy"
                ? "Eisiau gweld beth mae codi arian y CRhA wedi'i gyflawni eisoes?"
                : "Want to see what PTA fundraising has already achieved?"}
            </h2>
            <p className="text-gray-700 mt-2">
              {language === "cy"
                ? "Archwiliwch ein cyflawniadau cymunedol i weld beth sydd wedi'i ariannu hyd yma."
                : "Explore our community achievements to track what has been funded so far."}
            </p>
          </div>
          <Link href="/community-achievements" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            {language === "cy" ? "Gweld cyflawniadau cymunedol" : "View community achievements"} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
