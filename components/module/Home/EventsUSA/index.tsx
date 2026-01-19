"use client";

import MetricCard from "@/components/Common/MetricCard";
import { useGetEventStatusQuery } from "@/src/redux/api/eventApi";

const EventsUSA = () => {
  const { data: eventsStatusData } = useGetEventStatusQuery({});
  const status = eventsStatusData?.data;
  console.log("status", status);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
      <span className="inline-block rounded-xl border border-black px-3 py-1 text-sm sm:text-base font-semibold mb-4">
        Events
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8">
        Upcoming Events <br className="hidden sm:block" /> Across the USA
      </h1>

      <MetricCard
        metrics={[
          { value: status?.totalOrganizedEvents, title: "Organized Events" },
          { value: status?.totalParticipants, title: "Total Participants" },
          { value: "100%", title: "Success Rate" },
        ]}
      />
    </section>
  );
};

export default EventsUSA;