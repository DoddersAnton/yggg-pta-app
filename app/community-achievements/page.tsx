import { CheckCircle2, PiggyBank, Sparkles } from "lucide-react";

const achievements = [
  {
    title: "£4,200 raised for reading resources",
    summary:
      "Funds helped add new reading books, guided reading sets, and calm corner materials for younger learners.",
  },
  {
    title: "£2,750 funded a school hall sound system",
    summary:
      "A new portable system has improved assemblies, performances, and PTA events for families.",
  },
  {
    title: "£1,900 supported wellbeing and enrichment",
    summary:
      "Contributions covered visiting workshops and activity sessions to broaden learning opportunities.",
  },
];

export default function CommunityAchievementsPage() {
  return (
    <main className="pt-28 pb-14 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-2xl border bg-gradient-to-r from-purple-50 to-white p-8">
          <p className="text-sm uppercase tracking-wide text-purple-700 font-semibold">Community achievements</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">What we&apos;ve raised and what we&apos;ve funded</h1>
          <p className="mt-4 text-gray-700 max-w-3xl">
            Thanks to families, local supporters, and volunteers, PTA fundraising has funded meaningful improvements across school life.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {achievements.map((item) => (
            <article key={item.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <CheckCircle2 className="h-7 w-7 text-green-600 mb-3" />
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-purple-50 p-6">
            <PiggyBank className="h-7 w-7 text-primary mb-3" />
            <h3 className="text-xl font-semibold">Total raised this year (placeholder)</h3>
            <p className="mt-2 text-gray-700">£8,850</p>
          </div>
          <div className="rounded-xl border bg-yellow-50 p-6">
            <Sparkles className="h-7 w-7 text-yellow-600 mb-3" />
            <h3 className="text-xl font-semibold">Projects delivered (placeholder)</h3>
            <p className="mt-2 text-gray-700">6 school improvement projects supported so far.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
