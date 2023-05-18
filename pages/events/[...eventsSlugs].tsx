import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/result.title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";

function EventsSlugs(props: any) {
  // const router = useRouter();
  // const filterData = router.query.eventsSlugs;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }
  // const filterYear = filterData[0];
  // const filterMonth = filterData[1];
  // const numYear = +filterYear;
  // const numMonth = +filterMonth;
  
  // if (props.hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter events please try again !!!</p>
  //       </ErrorAlert>

  //       <div className="center">
  //         <Button link="/events">Show all events</Button>
  //       </div>
  //     </>
  //   );
  // }
  const filteredEvents = props.filteredEvents;
  

  if (props.notFoundEvents) {
    return (
      <>
    
        <ErrorAlert>
          <p>Events Not Found !!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  return (
    <div>
      
      <ResultsTitle date={props.date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const filterData = params.eventsSlugs;
  const filterYear = filterData[0];
  const filterMonth = filterData[1];
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        notFoundEvents: true,
      },
    };
  }
  
  const date = new Date(numYear, numMonth - 1);


  return {
    props: {
      filteredEvents: filteredEvents,
      date: date.toJSON()
    },
  };
}

export default EventsSlugs;
