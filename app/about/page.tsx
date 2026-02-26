"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { MotionCard } from "@/components/ui/motion-card";

const goals = {
  en: [
    "Support pupil wellbeing and enrichment across the school.",
    "Run inclusive community events that bring families together.",
    "Fundraise for resources that enhance learning and play.",
    "Build strong partnerships between parents, carers, and staff.",
  ],
  cy: [
    "Cefnogi lles disgyblion a chyfleoedd cyfoethogi ar draws yr ysgol.",
    "Cynnal digwyddiadau cymunedol cynhwysol sy'n dod â theuluoedd ynghyd.",
    "Codi arian ar gyfer adnoddau sy'n gwella dysgu a chwarae.",
    "Meithrin partneriaethau cryf rhwng rhieni, gofalwyr a staff.",
  ],
};

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <main className="pt-24 pb-12 px-6">
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold">
          {language === "cy" ? "Amdanom CRhA YGGG" : "About the YGGG PTA"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {language === "cy"
            ? "Mae'r CRhA yn bodoli i gryfhau'r cysylltiad rhwng y cartref a'r ysgol. Rydym yn trefnu digwyddiadau cymdeithasol, cyfleoedd gwirfoddoli, a phrosiectau codi arian sy'n cefnogi plant yn uniongyrchol ac yn helpu i greu cymuned ysgol fywiog."
            : "The PTA exists to strengthen the connection between home and school. We organise social events, volunteer opportunities, and fundraising projects that directly support children and help create a vibrant school community."}
        </p>
      </section>

      <section className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        <MotionCard>
          <h2 className="text-2xl font-semibold mb-4">{language === "cy" ? "Ein ffocws" : "Our focus"}</h2>
          <ul className="space-y-3">
            {goals[language].map((goal) => (
              <li key={goal} className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </MotionCard>

        <MotionCard className="bg-purple-50">
          <h2 className="text-2xl font-semibold mb-3">
            {language === "cy" ? "Beth rydym wedi'i gyflawni" : "What we have achieved"}
          </h2>
          <p className="text-gray-700 mb-5">
            {language === "cy"
              ? "Mae codi arian diweddar wedi helpu i ddarparu adnoddau dosbarth, deunyddiau digwyddiadau, a chefnogaeth ar gyfer profiadau ysgol sy'n gwneud dysgu'n fwy cofiadwy. Wrth i'r ysgol dyfu, mae'r CRhA yn parhau i hyrwyddo prosiectau sy'n elwa pob disgybl."
              : "Recent fundraising has helped provide classroom resources, event materials, and support for school experiences that make learning more memorable. As the school grows, the PTA continues to champion projects that benefit all pupils."}
          </p>
          <Button asChild>
            <Link href="/about/meetthepta">{language === "cy" ? "Cwrdd â thîm y CRhA" : "Meet the PTA team"}</Link>
          </Button>
        </MotionCard>
      </section>
    </main>
  );
}
