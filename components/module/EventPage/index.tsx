/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EventCard from "@/components/Common/EventsCard";
import {
  useGetSingleEventDataQuery,
  useTodayEventsQuery,
} from "@/src/redux/api/eventApi";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Membership from "../Home/Membership";

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString([], options);
};

const EventDetailsPage = () => {
  const { id } = useParams() as any;
  const { data: singleUpCommingEventData } = useGetSingleEventDataQuery({ id });
  const singleEvent = singleUpCommingEventData?.data as any;

  const { data: todayEventsData } = useTodayEventsQuery({});
  const todayEvents = todayEventsData?.data;
  console.log("todayEvents", todayEvents);

  return (
    <section className="bg-[#F7FFD9] min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="space-y-4 md:space-y-6 border-b md:border-b-0 md:border-r border-black/20 pb-6 md:pb-0 md:pr-8">
            <div className="flex items-center gap-3 text-sm font-medium">
              <CalendarDays className="w-5 h-5" />
              <span>{new Date(singleEvent?.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium">
              <Clock className="w-5 h-5" />
              <span>
                {singleEvent?.startTime
                  ? formatTime(singleEvent?.startTime)
                  : "N/A"}{" "}
                -{" "}
                {singleEvent?.endTime
                  ? formatTime(singleEvent?.endTime)
                  : "N/A"}{" "}
                {"(end time) "}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium">
              <MapPin className="w-5 h-5" />
              <span>{singleEvent?.location}</span>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              {singleEvent?.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-700">
              {singleEvent?.description}
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-20 bg-[#E6FF8F] rounded-3xl p-4 md:p-6">
          <div className="relative overflow-hidden rounded-2xl h-60 sm:h-80 md:h-96">
            <Image
              src={singleEvent?.image || "/images/Big Picture.png"}
              alt={singleEvent?.title || "Event image"}
              fill
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="bg-linear-to-r from-pink-100 via-white to-cyan-100 py-16 md:py-20 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="flex justify-center mb-8 lg:mb-0">
              <div className="rounded-[40px] overflow-hidden max-w-xs sm:max-w-md shadow-lg">
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
              <h2 className="text-3xl sm:text-4xl font-semibold flex items-center gap-3">
                Speakers
              </h2>

              <p className="mt-3 italic text-base sm:text-lg text-gray-700">
                {singleEvent?.description}
              </p>

              <p className="mt-6 text-gray-600 leading-relaxed text-md sm:text-base md:text-xl">
                {singleEvent?.title}
              </p>

              {/* <button className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-200 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-900 transition hover:bg-sky-300">
                Explore Events
              </button> */}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto my-20 px-4">
          <h1 className="text-3xl sm:text-4xl mb-3">On Its Way Events</h1>
          <p className="text-sm sm:text-base mb-6">
            Browse our curated list of padel courts, check real-time
            availability, and secure your slot in seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {todayEvents?.map((event: any) => (
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
