/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EventCard from "@/components/Common/EventsCard";
import { useTodayEventsQuery } from "@/src/redux/api/eventApi";

const WayEvents = () => {
  const { data: todayEventsData } = useTodayEventsQuery({});
  const todayEvents = todayEventsData?.data;
  console.log("todayEvents", todayEvents);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-16 my-20">
      {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
        On Its Way Events
      </h2> */}

      {/* <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
        Browse our curated list of padel courts, check real-time availability,
        and secure your slot in seconds.
      </p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {todayEvents?.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default WayEvents;
