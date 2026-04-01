"use client";

import Link from "next/link";
import { Mail, Phone, Users } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const interestOptions = {
  en: ["General enquiry", "Joining the PTA", "Volunteering at events", "Business sponsorship", "Fundraising idea"],
  cy: ["Ymholiad cyffredinol", "Ymuno â'r CRhA", "Gwirfoddoli mewn digwyddiadau", "Nawdd busnes", "Syniad codi arian"],
};

const contactCards = [
  {
    icon: Mail,
    titleEn: "Email us",
    titleCy: "E-bostiwch ni",
    detail: "pta@yggg.school",
    accent: "bg-purple-600",
  },
  {
    icon: Phone,
    titleEn: "Call us",
    titleCy: "Ffoniwch ni",
    detail: "01234 567890",
    accent: "bg-purple-700",
  },
  {
    icon: Users,
    titleEn: "Meet us",
    titleCy: "Cwrdd â ni",
    detailEn: "At the next PTA event",
    detailCy: "Yn nigwyddiad nesaf y CRhA",
    accent: "bg-purple-800",
  },
];

export default function ContactUsPage() {
  const { language } = useLanguage();

  return (
    <main className="bg-purple-50 min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <section className="space-y-4">
          <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
            {language === "cy" ? "Cysylltu" : "Contact"}
          </span>
          <h1 className="text-5xl font-black text-black leading-tight">
            {language === "cy" ? "Cysylltwch â ni" : "Contact Us"}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-gray-800 border-l-4 border-purple-500 pl-4">
            {language === "cy"
              ? "Byddem wrth ein bodd yn clywed gennych. Os oes gennych ddiddordeb mewn ymuno â'r CRhA, gwirfoddoli, neu rannu syniad codi arian, defnyddiwch y ffurflen hon i ddweud mwy wrthym."
              : "We would love to hear from you. If you are interested in joining the PTA, volunteering, or sharing a fundraising idea, use this form to tell us more."}
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contact chips */}
            <div className="grid gap-4 sm:grid-cols-3">
              {contactCards.map((card) => (
                <div key={card.titleEn} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                  <div className={`${card.accent} border-b-2 border-black px-4 py-3`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-wide mb-1">
                      {language === "cy" ? card.titleCy : card.titleEn}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {"detail" in card ? card.detail : language === "cy" ? card.detailCy : card.detailEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
              <div className="bg-yellow-300 border-b-2 border-black px-5 py-3">
                <p className="text-sm font-black uppercase tracking-wide text-black">
                  {language === "cy" ? "Beth sy'n digwydd nesaf?" : "What happens next?"}
                </p>
              </div>
              <div className="px-5 py-4 space-y-2">
                <p className="text-sm text-gray-700">
                  {language === "cy"
                    ? "Mae'r dudalen hon yn fodel ar hyn o bryd. Nid yw cyflwyniadau ffurflen wedi'u cysylltu eto."
                    : "This page is currently a mockup. Form submissions are not wired up yet."}
                </p>
                <p className="text-sm text-gray-600">
                  {language === "cy"
                    ? "Pan fydd hyn yn fyw, bydd gwirfoddolwr CRhA yn cysylltu â chi drwy e-bost."
                    : "When this goes live, a PTA volunteer will follow up with you by email."}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
            <div className="bg-purple-700 border-b-2 border-black px-6 py-4">
              <h2 className="font-black text-white text-base uppercase tracking-wide">
                {language === "cy" ? "Cofrestru eich diddordeb" : "Register your interest"}
              </h2>
              <p className="text-purple-200 text-xs mt-0.5">
                {language === "cy" ? "Rhannwch eich manylion a sut hoffech chi helpu." : "Share your details and how you would like to help."}
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-wide">
                  {language === "cy" ? "Enw llawn" : "Full name"}
                </Label>
                <Input
                  id="fullName"
                  placeholder={language === "cy" ? "Jane Rhiant" : "Jane Parent"}
                  className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-wide">
                  {language === "cy" ? "Cyfeiriad e-bost" : "Email address"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="interest" className="text-xs font-black uppercase tracking-wide">
                  {language === "cy" ? "Math o ymholiad" : "Type of enquiry"}
                </Label>
                <select
                  id="interest"
                  className="flex h-10 w-full border-2 border-black bg-white px-3 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                  defaultValue={interestOptions[language][0]}
                >
                  {interestOptions[language].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-black uppercase tracking-wide">
                  {language === "cy" ? "Neges" : "Message"}
                </Label>
                <Textarea
                  id="message"
                  placeholder={
                    language === "cy"
                      ? "Mae gen i ddiddordeb mewn helpu gyda digwyddiadau ysgol y tymor hwn..."
                      : "I am interested in helping with school events this term..."
                  }
                  className="min-h-32 rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  disabled
                  className="inline-block bg-purple-300 text-gray-500 font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-gray-400 cursor-not-allowed"
                >
                  {language === "cy" ? "Anfon neges (yn dod yn fuan)" : "Send message (coming soon)"}
                </button>
                <Link
                  href="/about/meetthepta"
                  className="inline-block bg-white text-black font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  {language === "cy" ? "Cwrdd â thîm y CRhA" : "Meet the PTA team"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
