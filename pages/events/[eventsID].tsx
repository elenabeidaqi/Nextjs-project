import { getEventById, getAllEvents } from "../../helpers/api-utils";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event.content";
import React from "react";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

function EventsID(props: any) {
  const event = props.selectedEvent;
  console.log("event", event);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>Not Found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventsID;

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event: any) => ({
    params: { eventsID: event.id },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const eventsID = context.params.eventsID;
  const event = await getEventById(eventsID);
  console.log("event", event);
  return {
    props: {
      selectedEvent: event,
      revalidate: 10,
    },
  };
}
