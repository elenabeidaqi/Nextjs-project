import React from "react";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "../../helpers/api-utils";
import EventSearch from "../../components/events/event.search";
import { useRouter } from "next/router";
import Head from "next/head";

function events(props: any) {
  const router = useRouter();
  const findEventsHandler = (year: any, month: any) => {
    const findpath = `/events/${year}/${month}`;
    router.push(findpath);
  };
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </>
  );
}

export default events;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
