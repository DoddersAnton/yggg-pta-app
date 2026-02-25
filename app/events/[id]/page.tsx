import EventDetail from "@/components/events/event-detail";
import { db } from "@/server";

export const dynamic = "force-dynamic";

type EventPageProps = {
  params: Promise<{ id: number }>;
};

export default async function Event({ params }: EventPageProps) {
  const { id } = await params;

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
