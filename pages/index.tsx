import {getFeaturedEvents} from "../dummy-data";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event.search";
import { useRouter } from "next/router";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  const router = useRouter();
  const findEventsHandler =(year : any , month : any)=>{
    const findpath = `/events/${year}/${month}`
    router.push(findpath);
  }
  return (
    <>
      <EventSearch onSearch ={findEventsHandler}/>
      <EventList items={featuredEvents}/>
    </>
  )
}
