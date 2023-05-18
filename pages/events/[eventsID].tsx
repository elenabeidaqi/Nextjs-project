import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-utils";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event.content";
import React from "react";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";

function EventsID(props: any) {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>
        </div>
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
  const events = await getFeaturedEvents();
  const paths = events.map((event: any) => ({
    params: { eventsID: event.id },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
  const eventsID = context.params.eventsID;
  const event = await getEventById(eventsID);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}
