import { db } from "@/server";
import EventDetail from "@/components/events/event-detail";

export default async function Event({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params; 

    console.log("Event ID:", id); // Log the event ID to the console

  const data = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, Number(id)),
  });

  if (!data) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  return (
    <main>
      <EventDetail activeEvent={data} />
    </main>
  );
}
