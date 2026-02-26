"use client";

import { CheckCircle2, PiggyBank, Sparkles } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { MotionCard } from "@/components/ui/motion-card";

const achievements = {
  en: [
    {
      title: "£4,200 raised for reading resources",
      summary:
        "Funds helped add new reading books, guided reading sets, and calm corner materials for younger learners.",
    },
    {
      title: "£2,750 funded a school hall sound system",
      summary:
        "A new portable system has improved assemblies, performances, and PTA events for families.",
    },
    {
      title: "£1,900 supported wellbeing and enrichment",
      summary:
        "Contributions covered visiting workshops and activity sessions to broaden learning opportunities.",
    },
  ],
  cy: [
    {
      title: "£4,200 wedi'i godi ar gyfer adnoddau darllen",
      summary:
        "Helpodd y cronfeydd i ychwanegu llyfrau darllen newydd, setiau darllen dan arweiniad, a deunyddiau corneli tawel i ddysgwyr iau.",
    },
    {
      title: "£2,750 wedi ariannu system sain neuadd yr ysgol",
      summary:
        "Mae system gludadwy newydd wedi gwella gwasanaethau, perfformiadau, a digwyddiadau CRhA i deuluoedd.",
    },
    {
      title: "£1,900 wedi cefnogi lles a chyfoethogi",
      summary:
        "Defnyddiwyd cyfraniadau i dalu am weithdai ymweliadol a sesiynau gweithgaredd i ehangu cyfleoedd dysgu.",
    },
  ],
};

export default function CommunityAchievementsPage() {
  const { language } = useLanguage();

  return (
    <main className="pt-28 pb-14 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-2xl border bg-gradient-to-r from-purple-50 to-white p-8">
          <p className="text-sm uppercase tracking-wide text-purple-700 font-semibold">
            {language === "cy" ? "Cyflawniadau cymunedol" : "Community achievements"}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            {language === "cy" ? "Beth rydym wedi'i godi a beth rydym wedi'i ariannu" : "What we've raised and what we've funded"}
          </h1>
          <p className="mt-4 text-gray-700 max-w-3xl">
            {language === "cy"
              ? "Diolch i deuluoedd, cefnogwyr lleol, a gwirfoddolwyr, mae codi arian y CRhA wedi ariannu gwelliannau ystyrlon ar draws bywyd ysgol."
              : "Thanks to families, local supporters, and volunteers, PTA fundraising has funded meaningful improvements across school life."}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {achievements[language].map((item) => (
            <MotionCard key={item.title}>
              <CheckCircle2 className="h-7 w-7 text-green-600 mb-3" />
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </MotionCard>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <MotionCard as="div" className="bg-purple-50">
            <PiggyBank className="h-7 w-7 text-primary mb-3" />
            <h3 className="text-xl font-semibold">
              {language === "cy" ? "Cyfanswm a godwyd eleni (daliwr lle)" : "Total raised this year (placeholder)"}
            </h3>
            <p className="mt-2 text-gray-700">£8,850</p>
          </MotionCard>
          <MotionCard as="div" className="bg-yellow-50">
            <Sparkles className="h-7 w-7 text-yellow-600 mb-3" />
            <h3 className="text-xl font-semibold">
              {language === "cy" ? "Prosiectau wedi'u cyflawni (daliwr lle)" : "Projects delivered (placeholder)"}
            </h3>
            <p className="mt-2 text-gray-700">
              {language === "cy" ? "6 phrosiect gwella ysgol wedi'u cefnogi hyd yma." : "6 school improvement projects supported so far."}
            </p>
          </MotionCard>
        </section>
      </div>
    </main>
  );
}
