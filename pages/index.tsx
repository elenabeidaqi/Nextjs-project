import { getFeaturedEvents, getAllEvents } from "../helpers/api-utils";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event.search";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home(props: any) {
  const router = useRouter();
  const findEventsHandler = (year: any, month: any) => {
    const findpath = `/events/${year}/${month}`;
    router.push(findpath);
  };

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to envolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
