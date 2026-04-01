"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/providers/language-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Member = {
  name: string;
  title: { en: string; cy: string };
  photo: string;
  bio: { en: string; cy: string };
  accent: string;
};

const members: Member[] = [
  {
    name: "Cheryl Voake-Jones",
    title: { en: "Chair", cy: "Cadeirydd" },
    photo: "/people.png",
    bio: {
      en: "Cheryl leads the PTA committee and helps shape our school community priorities.",
      cy: "Mae Cheryl yn arwain pwyllgor y CRhA ac yn helpu i lunio blaenoriaethau cymuned ein hysgol.",
    },
    accent: "bg-purple-800",
  },
  {
    name: "Anthony Dodwell",
    title: { en: "Treasurer", cy: "Trysorydd" },
    photo: "/people.png",
    bio: {
      en: "Anthony oversees budgeting and helps ensure PTA funds are used effectively for pupils.",
      cy: "Mae Anthony yn goruchwylio cyllidebu ac yn helpu i sicrhau bod cronfeydd y CRhA yn cael eu defnyddio'n effeithiol i ddisgyblion.",
    },
    accent: "bg-purple-600",
  },
  {
    name: "Megan Morris",
    title: { en: "Secretary", cy: "Ysgrifennydd" },
    photo: "/people.png",
    bio: {
      en: "Megan coordinates meeting notes, communication updates, and action tracking for the committee.",
      cy: "Mae Megan yn cydlynu nodiadau cyfarfodydd, diweddariadau cyfathrebu, ac olrhain gweithredoedd ar gyfer y pwyllgor.",
    },
    accent: "bg-purple-500",
  },
  {
    name: "Natasha Trotman",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Natasha supports PTA communications with parents, carers, and the wider school community.",
      cy: "Mae Natasha yn cefnogi cyfathrebu'r CRhA gyda rhieni, gofalwyr, a chymuned ehangach yr ysgol.",
    },
    accent: "bg-purple-400",
  },
  {
    name: "Sara Maynard",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Sara helps share PTA updates, event information, and key notices across communication channels.",
      cy: "Mae Sara yn helpu i rannu diweddariadau CRhA, gwybodaeth digwyddiadau, a negeseuon allweddol ar draws sianeli cyfathrebu.",
    },
    accent: "bg-purple-400",
  },
  {
    name: "Terry",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Terry contributes to PTA messaging and keeps families informed about upcoming opportunities.",
      cy: "Mae Terry yn cyfrannu at negeseuon y CRhA ac yn cadw teuluoedd yn wybodus am gyfleoedd sydd ar ddod.",
    },
    accent: "bg-purple-400",
  },
];

export default function MeetThePtaPage() {
  const { language } = useLanguage();

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      {/* Header */}
      <section className="max-w-6xl mx-auto mb-12 space-y-4">
        <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
          {language === "cy" ? "Y Tîm" : "The Team"}
        </span>
        <h1 className="text-5xl font-black text-black leading-tight">
          {language === "cy" ? "Cwrdd â'r CRhA" : "Meet the PTA"}
        </h1>
        <p className="text-base md:text-lg text-gray-800 max-w-3xl border-l-4 border-purple-500 pl-4">
          {language === "cy"
            ? "Cliciwch ar gerdyn aelod i ddysgu mwy am bwy ydynt a'r rôl maent yn ei chwarae wrth gefnogi cymuned ein hysgol."
            : "Click on a member card to learn more about who they are and the role they play in supporting our school community."}
        </p>
      </section>

      {/* Member grid */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <Dialog key={member.name}>
            <DialogTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: -3, y: -3 }}
                className="text-left border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <div className="relative w-full h-52 border-b-2 border-black overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={`${member.name} profile placeholder`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`${member.accent} border-b-2 border-black px-4 py-2`}>
                  <p className="text-xs font-black text-white uppercase tracking-widest">
                    {member.title[language]}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="font-black text-black text-base">{member.name}</p>
                  <p className="text-xs text-purple-700 font-black uppercase tracking-wide mt-1">
                    {language === "cy" ? "Gweld mwy →" : "View more →"}
                  </p>
                </div>
              </motion.button>
            </DialogTrigger>

            <DialogContent className="rounded-none border-2 border-black shadow-[8px_8px_0px_0px_#000] p-0 gap-0 max-w-md">
              <div className={`${member.accent} border-b-2 border-black px-6 py-4`}>
                <DialogTitle className="text-white font-black text-lg uppercase tracking-wide">
                  {member.name}
                </DialogTitle>
                <DialogDescription className="text-white/80 text-xs font-semibold uppercase tracking-widest mt-0.5">
                  {member.title[language]}
                </DialogDescription>
              </div>
              <div className="relative w-full h-52 border-b-2 border-black">
                <Image
                  src={member.photo}
                  alt={`${member.name} profile placeholder`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-800 leading-relaxed">{member.bio[language]}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </main>
  );
}
