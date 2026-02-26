import Events from "@/components/events/events";
import { db } from "@/server";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const data = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.id)],
  });

  return (
    <main className="pt-28 pb-14 px-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="container mx-auto">
        <section className="mb-8 rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Here&apos;s what&apos;s coming up</h1>
          <p className="mt-3 text-gray-700 max-w-3xl">
            Browse our upcoming PTA events, from family activities to fundraising nights, and reserve your place.
          </p>
        </section>

        <Events activeEvents={data} />
      </div>
    </main>
  );
}
