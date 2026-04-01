import Events from "@/components/events/events";
import EventsHeading from "./events-heading";
import { db } from "@/server";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const data = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.id)],
  });

  return (
    <main className="pt-24 pb-16 px-6 bg-purple-50 min-h-screen">
      <div className="container mx-auto">
        <EventsHeading />
        <Events activeEvents={data} />
      </div>
    </main>
  );
}
