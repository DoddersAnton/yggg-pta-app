"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, HandCoins, Trophy } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import TicketTape from "./ticket-tape";

const highlights = {
  en: [
    {
      title: "Upcoming PTA Events",
      description:
        "From school discos to family quiz nights, there is always something in the diary to bring families together.",
      icon: Calendar,
      href: "/events",
      accent: "bg-purple-400",
    },
    {
      title: "Fundraising Goals",
      description:
        "We fundraise for books, playground resources, and enrichment experiences that directly support every child.",
      icon: HandCoins,
      href: "/fundraising",
      accent: "bg-purple-600",
    },
    {
      title: "Community Achievements",
      description:
        "Thanks to volunteers and supporters, we have already funded new learning resources and memorable school activities.",
      icon: Trophy,
      href: "/community-achievements",
      accent: "bg-purple-800",
    },
  ],
  cy: [
    {
      title: "Digwyddiadau CRhA i Ddod",
      description:
        "O ddisgos ysgol i nosweithiau cwis teuluol, mae rhywbeth bob amser yn y dyddiadur i ddod â theuluoedd ynghyd.",
      icon: Calendar,
      href: "/events",
      accent: "bg-purple-400",
    },
    {
      title: "Nodau Codi Arian",
      description:
        "Rydym yn codi arian ar gyfer llyfrau, adnoddau maes chwarae, a phrofiadau cyfoethogi sy'n cefnogi pob plentyn yn uniongyrchol.",
      icon: HandCoins,
      href: "/fundraising",
      accent: "bg-purple-600",
    },
    {
      title: "Cyflawniadau Cymunedol",
      description:
        "Diolch i wirfoddolwyr a chefnogwyr, rydym eisoes wedi ariannu adnoddau dysgu newydd a gweithgareddau ysgol cofiadwy.",
      icon: Trophy,
      href: "/community-achievements",
      accent: "bg-purple-800",
    },
  ],
};

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="font-[family-name:var(--font-geist-sans)] pb-12 bg-purple-50">
      {/* Hero */}
      <section className="px-6 pt-28 pb-14 md:pt-32 md:pb-20 bg-purple-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-7"
          >
            {/* Eyebrow tag */}
            <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
              {language === "cy" ? "CRhA YGGG" : "YGGG PTA"}
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-black leading-tight">
              {language === "cy" ? (
                <>Croeso i<br />CRhA YGGG</>
              ) : (
                <>Welcome to<br />YGGG PTA</>
              )}
            </h1>

            <p className="text-base md:text-lg text-gray-800 max-w-lg border-l-4 border-purple-500 pl-4">
              {language === "cy"
                ? "Rydym yn gymuned o rieni, gofalwyr ac athrawon sy'n cefnogi ein hysgol trwy weithgareddau, digwyddiadau a chodi arian i greu cyfleoedd gwell i bob plentyn."
                : "We are a community of parents, carers, and staff working together to support our school through activities, events, and fundraising that create better opportunities for every child."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-block bg-purple-700 text-white font-black text-sm uppercase tracking-wide px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                {language === "cy" ? "Dysgu mwy amdanom" : "Learn more about us"}
              </Link>
              <Link
                href="/about/meetthepta"
                className="inline-block bg-white text-black font-black text-sm uppercase tracking-wide px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
              >
                {language === "cy" ? "Cwrdd â'r CRhA" : "Meet the PTA"}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative mx-auto"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-black bg-purple-200 shadow-[8px_8px_0px_0px_#000]">
              <Image src="/pta-logo-nobg.png" alt="YGGG PTA logo" fill className="object-contain p-4" priority />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticket tape */}
      <section className="h-12 w-full">
        <TicketTape />
      </section>

      {/* Highlight cards */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {highlights[language].map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              whileHover={{ x: -3, y: -3 }}
              className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] transition-shadow hover:shadow-[8px_8px_0px_0px_#000]"
            >
              <Link href={item.href} className="block">
                <div className={`${item.accent} border-b-2 border-black px-6 py-4`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-black mb-2 uppercase tracking-tight">{item.title}</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                  <span className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-purple-700 border-b-2 border-purple-700">
                    {language === "cy" ? "Darganfod mwy →" : "Find out more →"}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto border-2 border-black bg-purple-700 shadow-[8px_8px_0px_0px_#000] p-10 text-center">
          <h3 className="text-3xl font-black text-white uppercase mb-4">
            {language === "cy" ? "Ymunwch â'r CRhA" : "Get Involved with the PTA"}
          </h3>
          <p className="text-purple-100 mb-8 max-w-xl mx-auto">
            {language === "cy"
              ? "Mae pob awr o wirfoddoli a phob punt a godir yn helpu i ddarparu profiadau ystyrlon i ddisgyblion."
              : "Every hour volunteered and every pound raised helps deliver meaningful experiences for pupils."}
          </p>
          <Link
            href="/about/meetthepta"
            className="inline-block bg-yellow-300 text-black font-black text-sm uppercase tracking-wide px-8 py-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            {language === "cy" ? "Cwrdd â'n tîm" : "Meet our team"}
          </Link>
        </div>
      </section>
    </main>
  );
}
