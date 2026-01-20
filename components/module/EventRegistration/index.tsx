/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMeQuery } from "@/src/redux/api/authApi";
import {
  useGetSingleEventDataQuery,
  useRegisterEventsMutation,
} from "@/src/redux/api/eventApi";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Membership from "../Home/Membership";

const EventRegistration = () => {
  const id = useParams().id as any;

  // Form state
  const [skillLevel, setSkillLevel] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eventRegistration, { isLoading }] = useRegisterEventsMutation();
  const { data: userData } = useGetMeQuery({}) as any;
  const user = userData?.data;

  const { data: singleUpCommingEventData } = useGetSingleEventDataQuery({
    id,
  }) as any;
  const eventData = singleUpCommingEventData?.data;

  const event = eventData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skillLevel) {
      alert("Please select a skill level");
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        eventId: id,
        userName: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
        status: "PENDING",
        skillLevel: skillLevel.toUpperCase(),
        specialReq: specialReq || "",
      };

      console.log("Submitting registration:", registrationData);

      const res = await eventRegistration(registrationData).unwrap();

      if (res.success) {
        toast.success(res.message || "Registration successful!");
      } else {
        toast.error(res.message || "Registration failed!");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // If error has a response, handle it
      if (error) {
        const errorMessage =
          error?.data?.message || "An unknown error occurred!";
        toast.error(errorMessage);
      } else {
        // If no response, display a general error
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative h-screen w-full">
        <Image
          src={event?.image || "/images/event-registration.png"}
          alt="Event Registration Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-lime-400 px-6 py-4">
              <h2 className="text-lg font-semibold">Event Registration</h2>
              <p className="text-sm text-black/70">
                Complete the form below to register for the event
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Event Details</p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event?.title || "Event Title"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{event?.time || "Event Time"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event?.location || "Event Location"}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Member Name</label>
                  <input
                    type="text"
                    value={
                      user?.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : "Your Name"
                    }
                    disabled
                    className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-400">
                    This information is auto-filled from your profile
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Skill Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  >
                    <option value="">Select your skill level</option>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Special Requests{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={specialReq}
                    onChange={(e) => setSpecialReq(e.target.value)}
                    placeholder="Enter any special requests or notes for the organizer..."
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-400">
                    Let us know if you have any dietary restrictions,
                    accessibility needs, or other requests
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-lime-400 py-2 text-sm font-semibold hover:bg-lime-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register for Event"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Membership />
    </>
  );
};

export default EventRegistration;
