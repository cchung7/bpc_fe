/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { formatTime } from "../module/EventPage";

export default function EventCard({ event }: any) {
  // const eventImage = event?.image || "https://via.placeholder.com/150";

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
            {new Date(event?.date).toLocaleDateString()}{" "}
          </span>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          {event?.title || "Event Title"}
        </h2>
        <p className="text-gray-500 mb-6">
          {event?.description || "Event Description"}{" "}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Clock className="h-4 w-4" />
            <span>{event?.time ? formatTime(event?.time) : "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <MapPin className="h-4 w-4" />
            <span>{event?.location || "Event Location"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            {/* <Ticket className="h-4 w-4" /> */}
            {/* <span>
              {event?.capacity > 0 ? `$${event?.capacity}` : "Free for Members"}
            </span> */}
          </div>
        </div>
        
        <Link href={`/events/${event?.id}`}>
          <Button className="rounded-full px-6 py-5 bg-purple-200 text-purple-900 hover:bg-purple-300">
            Event Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}