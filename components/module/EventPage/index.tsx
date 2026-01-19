import EventCard from "@/components/Common/EventsCard";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Membership from "../Home/Membership";

const wayEventsData = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
];

const EventDetailsPage = () => {
  return (
    <section className="bg-[#F7FFD9] min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 border-r border-black/20 pr-8">
            <div className="flex items-center gap-3 text-sm font-medium">
              <CalendarDays className="w-5 h-5" />
              <span>Jan 20, 2025</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium">
              <Clock className="w-5 h-5" />
              <span>7:00 pm – 10:00 pm</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium">
              <MapPin className="w-5 h-5" />
              <span>Herbst Theatre, 401 Van Ness Ave, San Francisco</span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold">Global Tech Conference</h1>

            <p className="text-lg text-gray-700">
              Explore innovations and shape the future of technology
            </p>

            <p className="text-gray-600 leading-relaxed">
              The Global Tech Conference offers an exclusive opportunity for
              members to immerse themselves in the latest technological
              innovations and visionary ideas. This inspiring event brings
              together thought leaders, industry pioneers, and tech enthusiasts
              to exchange insights, foster collaboration, and explore the
              transformative ideas that define the cutting edge of technology.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-[#E6FF8F] rounded-3xl p-6">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/Big Picture.png"
              alt="Tennis Sport Open Tournament"
              width={1200}
              height={300}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
      <section className="bg-linear-to-r from-pink-100 via-white to-cyan-100 py-20 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="rounded-[40px] overflow-hidden max-w-md shadow-lg">
                <Image
                  src="/images/event1.png"
                  alt="Speaker"
                  width={500}
                  height={650}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold flex items-center gap-3">
                Speakers <span className="text-2xl"></span>
              </h2>

              <p className="mt-3 italic text-lg text-gray-700">
                Meet the Visionaries Behind Eventverse
              </p>

              <p className="mt-6 text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">
                  The Global Tech Conference
                </span>{" "}
                offers an exclusive opportunity for members to immerse
                themselves in the latest technological innovations and visionary
                ideas. This inspiring event brings together thought leaders,
                industry pioneers, and tech enthusiasts to exchange insights,
                foster collaboration, and shape the future of the tech world.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                It’s the perfect setting to spark innovation, build connections,
                and explore transformative ideas that define the cutting edge of
                technology.
              </p>

              <button className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-200 px-8 py-3 text-sm font-medium text-gray-900 transition hover:bg-sky-300">
                Explore Events
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto my-20">
          <h1 className="text-4xl mb-3">On Its Way events </h1>
          <p>
            Browse our curated list of padel courts, check real-time
            availability,
            <br />
            and secure your slot in seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {wayEventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <Membership />
      </section>
    </section>
  );
};

export default EventDetailsPage;