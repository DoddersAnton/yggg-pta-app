import Events from "@/components/events/events";
import { db } from "@/server";

export default async function EventsPage() {
    
    const data = (await db.query.events.findMany({
        orderBy: (events, { desc }) => [desc(events.id)],
      }));


    return (
        <div className="container mx-auto py-12">
            <Events activeEvents={data}/>
        </div>
    )
}