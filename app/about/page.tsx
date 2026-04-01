"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
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
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      {/* Header */}
      <section className="max-w-5xl mx-auto mb-12 space-y-4">
        <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
          {language === "cy" ? "Amdanom ni" : "About Us"}
        </span>
        <h1 className="text-5xl font-black text-black leading-tight">
          {language === "cy" ? "Amdanom CRhA YGGG" : "About the YGGG PTA"}
        </h1>
        <p className="text-base md:text-lg text-gray-800 max-w-3xl border-l-4 border-purple-500 pl-4">
          {language === "cy"
            ? "Mae'r CRhA yn bodoli i gryfhau'r cysylltiad rhwng y cartref a'r ysgol. Rydym yn trefnu digwyddiadau cymdeithasol, cyfleoedd gwirfoddoli, a phrosiectau codi arian sy'n cefnogi plant yn uniongyrchol ac yn helpu i greu cymuned ysgol fywiog."
            : "The PTA exists to strengthen the connection between home and school. We organise social events, volunteer opportunities, and fundraising projects that directly support children and help create a vibrant school community."}
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <MotionCard>
          <div className="bg-purple-600 border-b-2 border-black px-6 py-4 -mx-0 -mt-0">
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              {language === "cy" ? "Ein ffocws" : "Our focus"}
            </h2>
          </div>
          <ul className="space-y-3 p-6">
            {goals[language].map((goal) => (
              <li key={goal} className="flex items-start gap-3 text-gray-800">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-purple-600 shrink-0" />
                <span className="text-sm font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </MotionCard>

        <MotionCard delay={0.12}>
          <div className="bg-purple-800 border-b-2 border-black px-6 py-4">
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              {language === "cy" ? "Beth rydym wedi'i gyflawni" : "What we have achieved"}
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-sm text-gray-800 leading-relaxed">
              {language === "cy"
                ? "Mae codi arian diweddar wedi helpu i ddarparu adnoddau dosbarth, deunyddiau digwyddiadau, a chefnogaeth ar gyfer profiadau ysgol sy'n gwneud dysgu'n fwy cofiadwy. Wrth i'r ysgol dyfu, mae'r CRhA yn parhau i hyrwyddo prosiectau sy'n elwa pob disgybl."
                : "Recent fundraising has helped provide classroom resources, event materials, and support for school experiences that make learning more memorable. As the school grows, the PTA continues to champion projects that benefit all pupils."}
            </p>
            <Link
              href="/about/meetthepta"
              className="inline-block bg-purple-700 text-white font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              {language === "cy" ? "Cwrdd â thîm y CRhA" : "Meet the PTA team"}
            </Link>
          </div>
        </MotionCard>
      </section>
    </main>
  );
}
