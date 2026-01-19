/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import EventCard from "@/components/Common/EventsCard";
import MetricCard from "@/components/Common/MetricCard";
import EventResults from "@/components/module/EventResults";
import Membership from "@/components/module/Home/Membership";
import {
  useGetEventStatusQuery,
  useGetUpcommingEventsQuery,
} from "@/src/redux/api/eventApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchEvents = (date: string, time: string) => {
  return [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    { id: 3, name: "Event 3" },
    { id: 4, name: "Event 4" },
  ];
};

const page = () => {
  const params = useSearchParams();
  const date = params.get("date");
  const time = params.get("time");

  const { data: eventsStatusData } = useGetEventStatusQuery({});
  const status = eventsStatusData?.data;
  console.log("status", status);

  const { data: upcomingEventData } = useGetUpcommingEventsQuery({
    searchDate: date || undefined,
  }) as any;

  const upcomingEvents = upcomingEventData?.data?.data || [];
  const meta = upcomingEventData?.meta || {};
  console.log(upcomingEventData);

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (date && time) {
      const fetchedEvents = fetchEvents(date, time);
      setEvents(fetchedEvents);
    }
  }, [date, time]);

  return (
    <div className="bg-[#f7fde2]">
      <div>
        <EventResults upcomingEvents={upcomingEvents} meta={meta} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xl font-semibold border border-black px-3 py-1 my-4 inline-block rounded-xl">
          Events
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-10">
          Upcoming Events <br /> Across the USA
        </h1>

        <MetricCard
          metrics={[
            { value: status?.totalOrganizedEvents, title: "Organized Events" },
            { value: status?.totalParticipants, title: "Total Participants" },
            { value: "100%", title: "Success Rate" },
          ]}
        />
      </div>

      <div className="my-20 container mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl mb-3">On Its Way events</h1>
        <p className="text-lg sm:text-xl mb-6">
          Browse our curated list of padel courts, check real-time availability,
          <br />
          and secure your slot in seconds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {events.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
              <p className="text-2xl font-semibold">No Events</p>
            </div>
          ) : (
            events.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <Membership />
      </div>
    </div>
  );
};

export default page;