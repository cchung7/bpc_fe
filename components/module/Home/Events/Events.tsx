/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetUpcommingEventsQuery } from "@/src/redux/api/eventApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import EventSearch from "../EventSearch";
import EventsCard from "./EventsCard";

const users = [
  {
    id: 1,
    profileImage:
      "https://framerusercontent.com/images/qyN2CKkv6G5gxPKHn8LlwjzAE.jpeg?scale-down-to=1024",
    name: "Event 1",
  },
  {
    id: 2,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 2",
  },
  {
    id: 3,
    profileImage:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
    name: "Event 3",
  },
  {
    id: 4,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 4",
  },
  {
    id: 5,
    profileImage:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
    name: "Event 5",
  },
  {
    id: 6,
    profileImage:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
    name: "Event 6",
  },
];

const dammyEvents = [
  {
    id: "1",
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

const Events = () => {
  const { data: upcomingEventData } = useGetUpcommingEventsQuery({}) as any;

  const upcomingEvents = upcomingEventData?.data?.data || [];

  const [startIndex, setStartIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 6 >= users.length ? 0 : prev + 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMiddleIndex((prev) => (prev + 1) % users.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <EventSearch />

      {/* Heading Section */}
      <div className="px-4 sm:px-6 lg:px-16 py-10 sm:py-14 text-center">
        <h2 className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          <span>Events that</span>

          <span className="relative inline-block w-14 h-14 sm:w-28 sm:h-28 lg:w-32 lg:h-20">
            <Image
              src={users[middleIndex].profileImage}
              alt={users[middleIndex].name}
              fill
              className="rounded-2xl object-cover"
            />
          </span>

          <span>Inspire you</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-gray-600">
          Our events are crafted to deliver practical insights and foster
          valuable connections. Discover what&apos;s ahead.
        </p>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          Upcoming Events
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
          Browse our curated list of padel courts, check real-time availability,
          and secure your slot in seconds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-20">
          {upcomingEvents.slice(0, 2).map((event: any) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;