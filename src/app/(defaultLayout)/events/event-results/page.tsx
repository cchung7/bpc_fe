import EventCard from "@/components/Common/EventsCard";
import MetricCard from "@/components/Common/MetricCard";
import EventResults from "@/components/module/EventResults";
import Membership from "@/components/module/Home/Membership";

const wayEventsData = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
  {
    id: 2,
    name: "Event 2",
  },
  {
    id: 2,
    name: "Event 2",
  },
];

const page = () => {
  return (
    <div className="bg-[#f7fde2]">
      <div>
        <EventResults />
      </div>

      <div className="container mx-auto">
        <span className="text-xl font-semibold border border-black px-3 py-1 my-4 inline-block rounded-xl">
          Events
        </span>
        <h1 className="text-6xl mb-10">
          Upcoming Events <br /> Across the USA
        </h1>
        <MetricCard
          metrics={[
            { value: "400+", title: "Organized Events" },
            { value: "120K", title: "Active Users" },
            { value: "98%", title: "Success Rate" },
          ]}
        />
      </div>
      <div className="container mx-auto my-20">
        <h1 className="text-4xl mb-3">On Its Way events </h1>
        <p>
          Browse our curated list of padel courts, check real-time availability,
          <br />
          and secure your slot in seconds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {wayEventsData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div>
        <Membership />
      </div>
    </div>
  );
};

export default page;