"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, HandCoins, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import TicketTape from "./ticket-tape";

const highlights = [
  {
    title: "Upcoming PTA Events",
    description:
      "From school discos to family quiz nights, there is always something in the diary to bring families together.",
    icon: Calendar,
  },
  {
    title: "Fundraising Goals",
    description:
      "We fundraise for books, playground resources, and enrichment experiences that directly support every child.",
    icon: HandCoins,
  },
  {
    title: "Community Achievements",
    description:
      "Thanks to volunteers and supporters, we have already funded new learning resources and memorable school activities.",
    icon: Trophy,
  },
];

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="font-[family-name:var(--font-geist-sans)] pt-24 pb-12">
      <section className="px-6 py-12 md:py-20 bg-gradient-to-b from-purple-100 via-purple-50 to-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {language === "cy"
                ? "Croeso i CRhA YGGG"
                : "Welcome to the YGGG PTA"}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl">
              {language === "cy"
                ? "Rydym yn gymuned o rieni, gofalwyr ac athrawon sy'n cefnogi ein hysgol trwy weithgareddau, digwyddiadau a chodi arian i greu cyfleoedd gwell i bob plentyn."
                : "We are a community of parents, carers, and staff working together to support our school through activities, events, and fundraising that create better opportunities for every child."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/about">Learn more about us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about/meetthepta">Meet the PTA</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto w-60 h-60 md:w-72 md:h-72"
          >
            <Image
              src="/pta-logo-nobg.png"
              alt="YGGG PTA logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      <section className="h-12 w-full bg-yellow-50/70">
        <TicketTape />
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto rounded-2xl bg-purple-50 border border-purple-100 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Get involved with the PTA</h3>
          <p className="text-gray-700 mb-5">
            Every hour volunteered and every pound raised helps deliver meaningful experiences for pupils.
          </p>
          <Button asChild>
            <Link href="/about/meetthepta">Meet our team</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
