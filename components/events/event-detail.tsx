
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { ActiveEvent } from '@/lib/infer-type';
import EventInformation from './event-information';
import AddCart from '../cart/add-cart';

interface IEvent {
    activeEvent: ActiveEvent
}

export default function EventDetail({activeEvent}: IEvent) {
  return (
    <section className="flex flex-col lg:flex-row gap-4 lg:gap-12 py-24 container mx-auto">
    <div className="flex-1">
      <Image
        width={600}
          height={300}
        src={activeEvent?.imgUrl ?? "/party.png"}
        alt="event image"
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
    <div className="flex  flex-col flex-1">
      <h2 className="text-2xl font-bold">{activeEvent?.name}</h2>
      <Separator className="my-2" />
      <div className='w-full'>
        <EventInformation price={activeEvent.price} location={activeEvent.location} description={activeEvent.description ?? ""} 
        startDate={activeEvent.startDate} endDate={activeEvent.endDate} capacity={activeEvent.capacity} remainingCapacity={activeEvent.remainingCapacity}
        />
      </div>
      
    
      <div className="flex gap-4 ">
       <AddCart id={activeEvent.id} title={activeEvent.name} price={activeEvent.price} image={activeEvent.imgUrl ?? "/party.png"}/>
      </div>
    </div>
  </section>
  )
}