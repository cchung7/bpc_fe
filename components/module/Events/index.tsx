"use client";

import EventCard from "@/components/Common/EventsCard";
import MetricCard from "@/components/Common/MetricCard";
import { useGetEventStatusQuery } from "@/src/redux/api/eventApi";
import EventsCard from "../Home/Events/EventsCard";
import Membership from "../Home/Membership";

const dammyEvents = [
  {
    id: 1,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
];

const wayEventsData = [
  { id: 1, name: "Event 1" },
  { id: 2, name: "Event 2" },
  { id: 3, name: "Event 3" },
  { id: 4, name: "Event 4" },
];

const EventsPage = () => {
  const { data: eventsStatusData } = useGetEventStatusQuery({});
  const status = eventsStatusData?.data;
  console.log("status", status);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Upcoming Events
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Browse our curated list of padel courts, check real-time
            availability, and secure your slot in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {dammyEvents.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <MetricCard
          metrics={[
            { value: "400+", title: "Organized Events" },
            { value: "120K", title: "Active Users" },
            { value: "98%", title: "Success Rate" },
          ]}
        />
      </section>

      {/* On Its Way Events */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            On Its Way Events
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Browse our curated list of padel courts, check real-time
            availability, and secure your slot in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {wayEventsData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Membership */}
      <Membership />
    </>
  );
};

export default EventsPage;