"use client";

import Link from "next/link";
import { ArrowRight, Goal, HandHeart, Wrench } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { MotionCard } from "@/components/ui/motion-card";

const priorities = {
  en: [
    {
      title: "Outdoor play equipment refresh",
      detail: "We are raising funds for durable playground pieces and safer surfacing so children can stay active all year.",
      icon: Goal,
      accent: "bg-purple-600",
    },
    {
      title: "Classroom technology upgrades",
      detail: "Planned purchases include new tablets, charging stations, and interactive tools to support digital learning.",
      icon: Wrench,
      accent: "bg-purple-700",
    },
    {
      title: "Enrichment and wellbeing programmes",
      detail: "From visiting workshops to after-school experiences, we want every year group to access memorable opportunities.",
      icon: HandHeart,
      accent: "bg-purple-800",
    },
  ],
  cy: [
    {
      title: "Adnewyddu offer chwarae awyr agored",
      detail: "Rydym yn codi arian ar gyfer offer maes chwarae gwydn ac arwyneb mwy diogel fel bod plant yn gallu aros yn egnïol drwy'r flwyddyn.",
      icon: Goal,
      accent: "bg-purple-600",
    },
    {
      title: "Uwchraddio technoleg dosbarth",
      detail: "Mae'r cynlluniau'n cynnwys tabledi newydd, gorsafoedd gwefru, ac offer rhyngweithiol i gefnogi dysgu digidol.",
      icon: Wrench,
      accent: "bg-purple-700",
    },
    {
      title: "Rhaglenni cyfoethogi a lles",
      detail: "O weithdai ymweliadol i brofiadau ar ôl ysgol, rydym eisiau i bob blwyddyn gael cyfleoedd cofiadwy.",
      icon: HandHeart,
      accent: "bg-purple-800",
    },
  ],
};

export default function FundraisingPage() {
  const { language } = useLanguage();

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <section className="space-y-4">
          <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
            {language === "cy" ? "Codi Arian" : "Fundraising"}
          </span>
          <h1 className="text-5xl font-black text-black leading-tight">
            {language === "cy" ? "Beth rydym yn codi arian ar ei gyfer ar hyn o bryd" : "What we are currently raising money for"}
          </h1>
          <p className="text-base md:text-lg text-gray-800 max-w-3xl border-l-4 border-purple-500 pl-4">
            {language === "cy"
              ? "Mae pob ymgyrch codi arian yn gysylltiedig ag angen ymarferol yn yr ysgol. Y blaenoriaethau isod yw ein ffocws presennol a dyma lle mae eich cyfraniadau'n gwneud y gwahaniaeth mwyaf."
              : "Every fundraising campaign is linked to a practical need in school. The priorities below are our current focus and where your donations make the biggest difference."}
          </p>
        </section>

        {/* Priority cards */}
        <section className="grid gap-6 md:grid-cols-3">
          {priorities[language].map((priority, index) => (
            <MotionCard key={priority.title} delay={index * 0.12}>
              <div className={`${priority.accent} border-b-2 border-black px-6 py-4`}>
                <priority.icon className="h-7 w-7 text-white" />
              </div>
              <div className="p-6">
                <h2 className="text-base font-black uppercase tracking-tight mb-2">{priority.title}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{priority.detail}</p>
              </div>
            </MotionCard>
          ))}
        </section>

        {/* CTA */}
        <section className="border-2 border-black bg-purple-700 shadow-[8px_8px_0px_0px_#000] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white uppercase">
              {language === "cy"
                ? "Eisiau gweld beth mae codi arian y CRhA wedi'i gyflawni eisoes?"
                : "Want to see what PTA fundraising has already achieved?"}
            </h2>
            <p className="text-purple-200 mt-2 text-sm">
              {language === "cy"
                ? "Archwiliwch ein cyflawniadau cymunedol i weld beth sydd wedi'i ariannu hyd yma."
                : "Explore our community achievements to track what has been funded so far."}
            </p>
          </div>
          <Link
            href="/community-achievements"
            className="shrink-0 inline-flex items-center gap-2 bg-yellow-300 text-black font-black text-xs uppercase tracking-wide px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            {language === "cy" ? "Gweld cyflawniadau cymunedol" : "View community achievements"} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
