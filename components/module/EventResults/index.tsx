/* eslint-disable @typescript-eslint/no-explicit-any */

import EventsCard from "../Home/Events/EventsCard";

const EventResults = ({ upcomingEvents, meta }: any) => {
  console.log("upcomingEvents", upcomingEvents);
  return (
    <div className="container mx-auto px-4 bg-[#f7fde2] pt-8">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-4">Upcoming Events</h1>
        <p>
          Browse our curated list of padel courts, check real-time availability,
          <br />
          and secure your slot in seconds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 mb-20">
          {upcomingEvents.length == 0 ? (
            <h1 className="text-2xl ">No Upcoming Events</h1>
          ) : (
            <>
              {" "}
              {upcomingEvents ? (
                upcomingEvents.map((event: any) => (
                  <EventsCard key={event.id} event={event} />
                ))
              ) : (
                <p>No events found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventResults;