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
    name: "Alex Morgan",
    title: { en: "PTA Chair", cy: "Cadeirydd y CRhA" },
    photo: "/people.png",
    bio: {
      en: "Alex coordinates the PTA committee and leads planning for annual priorities, events, and volunteer teams.",
      cy: "Mae Alex yn cydlynu pwyllgor y CRhA ac yn arwain cynllunio blaenoriaethau blynyddol, digwyddiadau, a thimau gwirfoddolwyr.",
    },
  },
  {
    name: "Sian Roberts",
    title: { en: "Vice Chair", cy: "Is-gadeirydd" },
    photo: "/people.png",
    bio: {
      en: "Sian supports cross-year activities and helps ensure events are inclusive, welcoming, and family friendly.",
      cy: "Mae Sian yn cefnogi gweithgareddau traws-flwyddyn ac yn helpu i sicrhau bod digwyddiadau'n gynhwysol, croesawgar, ac yn addas i deuluoedd.",
    },
  },
  {
    name: "Tom Evans",
    title: { en: "Treasurer", cy: "Trysorydd" },
    photo: "/people.png",
    bio: {
      en: "Tom manages budgeting, tracks fundraising outcomes, and reports clearly on how funds benefit pupils.",
      cy: "Mae Tom yn rheoli cyllidebu, yn olrhain canlyniadau codi arian, ac yn adrodd yn glir ar sut mae'r arian yn elwa disgyblion.",
    },
  },
  {
    name: "Megan Hughes",
    title: { en: "Secretary", cy: "Ysgrifennydd" },
    photo: "/people.png",
    bio: {
      en: "Megan keeps meetings organised, records action points, and helps communicate updates with the school community.",
      cy: "Mae Megan yn trefnu cyfarfodydd, yn cofnodi pwyntiau gweithredu, ac yn helpu i gyfathrebu diweddariadau gyda chymuned yr ysgol.",
    },
  },
  {
    name: "Rhys Williams",
    title: { en: "Events Coordinator", cy: "Cydlynydd Digwyddiadau" },
    photo: "/people.png",
    bio: {
      en: "Rhys leads event logistics and works with volunteers to run successful community activities throughout the year.",
      cy: "Mae Rhys yn arwain logisteg digwyddiadau ac yn gweithio gyda gwirfoddolwyr i gynnal gweithgareddau cymunedol llwyddiannus drwy'r flwyddyn.",
    },
  },
  {
    name: "Nia Thomas",
    title: { en: "Volunteer Lead", cy: "Arweinydd Gwirfoddolwyr" },
    photo: "/people.png",
    bio: {
      en: "Nia helps recruit and support parent volunteers, matching skills and availability with PTA needs.",
      cy: "Mae Nia yn helpu i recriwtio a chefnogi gwirfoddolwyr rhieni, gan baru sgiliau ac argaeledd ag anghenion y CRhA.",
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
