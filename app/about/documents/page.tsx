import { FileText, Newspaper, Scale } from "lucide-react";

import { MotionCard } from "@/components/ui/motion-card";

const placeholders = [
  {
    title: "Governance documents",
    description: "Placeholder area for policies, constitutions, annual reports, and committee records.",
    icon: Scale,
  },
  {
    title: "Newsletters",
    description: "Placeholder area for PTA newsletters, school community updates, and fundraising summaries.",
    icon: Newspaper,
  },
  {
    title: "General documents",
    description: "Placeholder area for meeting notes, event packs, and other downloadable resources.",
    icon: FileText,
  },
];

export default function AboutDocumentsPage() {
  return (
    <main className="min-h-screen px-6 pb-12 pt-24">
      <section className="mx-auto mb-8 max-w-6xl space-y-3">
        <h1 className="text-4xl font-extrabold">Reports & Documents</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          This page is a placeholder for governance documents, newsletters, and related PTA files.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {placeholders.map((item) => (
          <MotionCard key={item.title}>
            <item.icon className="mb-3 h-7 w-7 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </MotionCard>
        ))}
      </section>
    </main>
  );
}
