import { db } from "@/server"
import { DataTable } from "./data-table"
import { columns } from "./columns"


export default async function Events() {
    const events =await db.query.events.findMany({
        orderBy: (events, { desc }) => [desc(events.id)],
      });

      if (!events) throw new Error("No events found")

      const dataTable = events.map((event) => {
       
          return {
            id: event.id,
            name: event.name,
            price: event.price,
            capacity: event.capacity,
            remainingCapacity: event.remainingCapacity,
            startDate: event.startDate,
            endDate: event.endDate,
            image: event.imgUrl ?? '/party.png',
            imageWel: event.imgUrlWel ?? '/party.png',
          }
        });
    

    return (
        <div>
      <DataTable columns={columns} data={dataTable} />
        </div>
    )
}