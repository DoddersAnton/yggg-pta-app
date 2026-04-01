"use client";

import { CheckCircle2, PiggyBank, Sparkles } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { MotionCard } from "@/components/ui/motion-card";

const achievements = {
  en: [
    {
      title: "£4,200 raised for reading resources",
      summary: "Funds helped add new reading books, guided reading sets, and calm corner materials for younger learners.",
    },
    {
      title: "£2,750 funded a school hall sound system",
      summary: "A new portable system has improved assemblies, performances, and PTA events for families.",
    },
    {
      title: "£1,900 supported wellbeing and enrichment",
      summary: "Contributions covered visiting workshops and activity sessions to broaden learning opportunities.",
    },
  ],
  cy: [
    {
      title: "£4,200 wedi'i godi ar gyfer adnoddau darllen",
      summary: "Helpodd y cronfeydd i ychwanegu llyfrau darllen newydd, setiau darllen dan arweiniad, a deunyddiau corneli tawel i ddysgwyr iau.",
    },
    {
      title: "£2,750 wedi ariannu system sain neuadd yr ysgol",
      summary: "Mae system gludadwy newydd wedi gwella gwasanaethau, perfformiadau, a digwyddiadau CRhA i deuluoedd.",
    },
    {
      title: "£1,900 wedi cefnogi lles a chyfoethogi",
      summary: "Defnyddiwyd cyfraniadau i dalu am weithdai ymweliadol a sesiynau gweithgaredd i ehangu cyfleoedd dysgu.",
    },
  ],
};

export default function CommunityAchievementsPage() {
  const { language } = useLanguage();

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <section className="space-y-4">
          <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
            {language === "cy" ? "Cyflawniadau cymunedol" : "Community achievements"}
          </span>
          <h1 className="text-5xl font-black text-black leading-tight">
            {language === "cy" ? "Beth rydym wedi'i godi a beth rydym wedi'i ariannu" : "What we've raised and what we've funded"}
          </h1>
          <p className="text-base md:text-lg text-gray-800 max-w-3xl border-l-4 border-purple-500 pl-4">
            {language === "cy"
              ? "Diolch i deuluoedd, cefnogwyr lleol, a gwirfoddolwyr, mae codi arian y CRhA wedi ariannu gwelliannau ystyrlon ar draws bywyd ysgol."
              : "Thanks to families, local supporters, and volunteers, PTA fundraising has funded meaningful improvements across school life."}
          </p>
        </section>

        {/* Achievement cards */}
        <section className="grid gap-6 md:grid-cols-3">
          {achievements[language].map((item, index) => (
            <MotionCard key={item.title} delay={index * 0.12}>
              <div className="bg-green-600 border-b-2 border-black px-6 py-4">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="p-6">
                <h2 className="text-base font-black uppercase tracking-tight mb-2">{item.title}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{item.summary}</p>
              </div>
            </MotionCard>
          ))}
        </section>

        {/* Stats */}
        <section className="grid gap-6 md:grid-cols-2">
          <MotionCard as="div" delay={0.1}>
            <div className="bg-purple-700 border-b-2 border-black px-6 py-4">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-base font-black uppercase tracking-tight mb-1">
                {language === "cy" ? "Cyfanswm a godwyd eleni (daliwr lle)" : "Total raised this year (placeholder)"}
              </h3>
              <p className="text-3xl font-black text-purple-700">£8,850</p>
            </div>
          </MotionCard>

          <MotionCard as="div" delay={0.22}>
            <div className="bg-yellow-400 border-b-2 border-black px-6 py-4">
              <Sparkles className="h-6 w-6 text-black" />
            </div>
            <div className="p-6">
              <h3 className="text-base font-black uppercase tracking-tight mb-1">
                {language === "cy" ? "Prosiectau wedi'u cyflawni (daliwr lle)" : "Projects delivered (placeholder)"}
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {language === "cy" ? "6 phrosiect gwella ysgol wedi'u cefnogi hyd yma." : "6 school improvement projects supported so far."}
              </p>
            </div>
          </MotionCard>
        </section>
      </div>
    </main>
  );
}
