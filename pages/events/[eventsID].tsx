import { useRouter } from 'next/router';
import {getEventById} from "../../dummy-data";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event.content";
import React from 'react';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';

function eventsID() {
  const router = useRouter();
  const eventId = router.query.eventsID;
  const event = getEventById(eventId)
  console.log("event" , event)

  if(!event){
    return <>
    <ErrorAlert>
    <p>Not Found!</p>
    </ErrorAlert>
    <div className='center'>
      <Button link="/events">Show all events</Button>
    </div>
    </>
  }

  return (
    <>
    <EventSummary title={event.title}/>
    <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
    <EventContent>
      <p>{event.description}</p>
    </EventContent>
    </>
  )
}

export default eventsID;