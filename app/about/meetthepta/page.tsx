"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  },
  {
    name: "Anthony Dodwell",
    title: { en: "Treasurer", cy: "Trysorydd" },
    photo: "/people.png",
    bio: {
      en: "Anthony oversees budgeting and helps ensure PTA funds are used effectively for pupils.",
      cy: "Mae Anthony yn goruchwylio cyllidebu ac yn helpu i sicrhau bod cronfeydd y CRhA yn cael eu defnyddio'n effeithiol i ddisgyblion.",
    },
  },
  {
    name: "Megan Morris",
    title: { en: "Secretary", cy: "Ysgrifennydd" },
    photo: "/people.png",
    bio: {
      en: "Megan coordinates meeting notes, communication updates, and action tracking for the committee.",
      cy: "Mae Megan yn cydlynu nodiadau cyfarfodydd, diweddariadau cyfathrebu, ac olrhain gweithredoedd ar gyfer y pwyllgor.",
    },
  },
  {
    name: "Natasha Trotman",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Natasha supports PTA communications with parents, carers, and the wider school community.",
      cy: "Mae Natasha yn cefnogi cyfathrebu'r CRhA gyda rhieni, gofalwyr, a chymuned ehangach yr ysgol.",
    },
  },
  {
    name: "Sara Maynard",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Sara helps share PTA updates, event information, and key notices across communication channels.",
      cy: "Mae Sara yn helpu i rannu diweddariadau CRhA, gwybodaeth digwyddiadau, a negeseuon allweddol ar draws sianeli cyfathrebu.",
    },
  },
  {
    name: "Terry",
    title: { en: "Communications", cy: "Cyfathrebu" },
    photo: "/people.png",
    bio: {
      en: "Terry contributes to PTA messaging and keeps families informed about upcoming opportunities.",
      cy: "Mae Terry yn cyfrannu at negeseuon y CRhA ac yn cadw teuluoedd yn wybodus am gyfleoedd sydd ar ddod.",
    },
  },
];

export default function MeetThePtaPage() {
  const { language } = useLanguage();

  return (
    <main className="pt-24 pb-12 px-6">
      <section className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold mb-3">{language === "cy" ? "Cwrdd â'r CRhA" : "Meet the PTA"}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {language === "cy"
            ? "Cliciwch ar gerdyn aelod i ddysgu mwy am bwy ydynt a'r rôl maent yn ei chwarae wrth gefnogi cymuned ein hysgol."
            : "Click on a member card to learn more about who they are and the role they play in supporting our school community."}
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member) => (
          <Dialog key={member.name}>
            <DialogTrigger asChild>
              <button className="text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
                  <div className="relative w-full h-56">
                    <Image src={member.photo} alt={`${member.name} profile placeholder`} fill className="object-cover rounded-t-xl" />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.title[language]}</p>
                  </CardContent>
                </Card>
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{member.name}</DialogTitle>
                <DialogDescription>{member.title[language]}</DialogDescription>
              </DialogHeader>
              <div className="relative w-full h-56 rounded-md overflow-hidden border">
                <Image src={member.photo} alt={`${member.name} profile placeholder`} fill className="object-cover" />
              </div>
              <p className="text-sm text-gray-700">{member.bio[language]}</p>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </main>
  );
}
