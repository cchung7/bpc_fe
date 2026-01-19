/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetUpcommingEventsQuery } from "@/src/redux/api/eventApi";
import TournamentCard from "./TournamentCard";

const PlayCompete = () => {
  const {
    data: eventsData,
    isLoading,
    error,
  } = useGetUpcommingEventsQuery({}) as any;

  const events = eventsData?.data?.data || [];

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="bg-[#ccf64d]">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <p className="text-sm sm:text-base md:text-lg font-medium border-l-4 border-gray-800 pl-4">
            Upcoming Events
          </p>

          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
              Play. Compete. Connect. Together.
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Join us for competitive tournaments, casual play sessions, and
              skill-building workshops.
            </p>
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
          {events.slice(0, 3).map((tournament: any) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayCompete;