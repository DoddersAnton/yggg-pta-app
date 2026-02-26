import Link from "next/link";
import { ArrowRight, Goal, HandHeart, Wrench } from "lucide-react";

const priorities = [
  {
    title: "Outdoor play equipment refresh",
    detail:
      "We are raising funds for durable playground pieces and safer surfacing so children can stay active all year.",
    icon: Goal,
  },
  {
    title: "Classroom technology upgrades",
    detail:
      "Planned purchases include new tablets, charging stations, and interactive tools to support digital learning.",
    icon: Wrench,
  },
  {
    title: "Enrichment and wellbeing programmes",
    detail:
      "From visiting workshops to after-school experiences, we want every year group to access memorable opportunities.",
    icon: HandHeart,
  },
];

export default function FundraisingPage() {
  return (
    <main className="pt-28 pb-14 px-6 bg-gradient-to-b from-purple-100 via-purple-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-2xl border border-purple-200 bg-white/80 p-8 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-purple-700 font-semibold">Fundraising</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">What we are currently raising money for</h1>
          <p className="mt-4 text-gray-700 max-w-3xl">
            Every fundraising campaign is linked to a practical need in school. The priorities below are our current focus and where your donations make the biggest difference.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {priorities.map((priority) => (
            <article key={priority.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <priority.icon className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">{priority.title}</h2>
              <p className="text-sm text-muted-foreground">{priority.detail}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-purple-50 border border-purple-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Want to see what PTA fundraising has already achieved?</h2>
            <p className="text-gray-700 mt-2">Explore our community achievements to track what has been funded so far.</p>
          </div>
          <Link href="/community-achievements" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            View community achievements <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
