"use client";

import Link from "next/link";
import { Mail, Phone, Users } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const interestOptions = {
  en: ["General enquiry", "Joining the PTA", "Volunteering at events", "Business sponsorship", "Fundraising idea"],
  cy: ["Ymholiad cyffredinol", "Ymuno â'r CRhA", "Gwirfoddoli mewn digwyddiadau", "Nawdd busnes", "Syniad codi arian"],
};

export default function ContactUsPage() {
  const { language } = useLanguage();

  return (
    <main className="pt-24 pb-12 px-6">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight">{language === "cy" ? "Cysylltwch â ni" : "Contact Us"}</h1>
            <p className="max-w-2xl text-muted-foreground">
              {language === "cy"
                ? "Byddem wrth ein bodd yn clywed gennych. Os oes gennych ddiddordeb mewn ymuno â'r CRhA, gwirfoddoli, neu rannu syniad codi arian, defnyddiwch y ffurflen hon i ddweud mwy wrthym."
                : "We would love to hear from you. If you are interested in joining the PTA, volunteering, or sharing a fundraising idea, use this form to tell us more."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{language === "cy" ? "E-bostiwch ni" : "Email us"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>pta@yggg.school</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Phone className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{language === "cy" ? "Ffoniwch ni" : "Call us"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>01234 567890</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{language === "cy" ? "Cwrdd â ni" : "Meet us"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{language === "cy" ? "Yn nigwyddiad nesaf y CRhA" : "At the next PTA event"}</CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">{language === "cy" ? "Beth sy'n digwydd nesaf?" : "What happens next?"}</CardTitle>
              <CardDescription>
                {language === "cy"
                  ? "Mae'r dudalen hon yn fodel ar hyn o bryd. Nid yw cyflwyniadau ffurflen wedi'u cysylltu eto."
                  : "This page is currently a mockup. Form submissions are not wired up yet."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {language === "cy"
                  ? "Pan fydd hyn yn fyw, bydd gwirfoddolwr CRhA yn cysylltu â chi drwy e-bost."
                  : "When this goes live, a PTA volunteer will follow up with you by email."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === "cy" ? "Cofrestru eich diddordeb" : "Register your interest"}</CardTitle>
            <CardDescription>
              {language === "cy" ? "Rhannwch eich manylion a sut hoffech chi helpu." : "Share your details and how you would like to help."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{language === "cy" ? "Enw llawn" : "Full name"}</Label>
              <Input id="fullName" placeholder={language === "cy" ? "Jane Rhiant" : "Jane Parent"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{language === "cy" ? "Cyfeiriad e-bost" : "Email address"}</Label>
              <Input id="email" type="email" placeholder="jane@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest">{language === "cy" ? "Math o ymholiad" : "Type of enquiry"}</Label>
              <select
                id="interest"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue={interestOptions[language][0]}
              >
                {interestOptions[language].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{language === "cy" ? "Neges" : "Message"}</Label>
              <Textarea
                id="message"
                placeholder={
                  language === "cy"
                    ? "Mae gen i ddiddordeb mewn helpu gyda digwyddiadau ysgol y tymor hwn..."
                    : "I am interested in helping with school events this term..."
                }
                className="min-h-32"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" disabled>
                {language === "cy" ? "Anfon neges (yn dod yn fuan)" : "Send message (coming soon)"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/meetthepta">{language === "cy" ? "Cwrdd â thîm y CRhA" : "Meet the PTA team"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
