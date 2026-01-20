"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventSearch() {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  console.log("date", date);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleSearch = () => {
    console.log("Selected date:", date);

    if (date) {
      // Format date as YYYY-MM-DD in local timezone
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const localDateString = `${year}-${month}-${day}`;

      router.push(`/events/event-results?date=${localDateString}`);
    }
    setIsExpanded(false);
  };

  return (
    <section className="bg-[#f5fddb] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {!isExpanded && (
          <div className="flex flex-col gap-4 rounded-3xl bg-[#d4ff4c] p-4 shadow-lg sm:flex-row sm:items-center sm:p-6">
            <button onClick={() => setIsExpanded(true)} className="text-left">
              <h1 className="font-serif text-xl sm:text-3xl md:text-4xl text-black">
                Search events by date →
              </h1>
            </button>

            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm sm:ml-auto sm:min-w-70">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search events"
                className="flex-1 bg-transparent text-sm sm:text-base text-gray-600 outline-none"
                onFocus={() => setIsExpanded(true)}
              />
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <div className="bg-[#d4ff4c] p-4 sm:p-6">
              <h1 className="text-center font-serif text-xl sm:text-2xl md:text-3xl text-black">
                Search upcoming events by date
              </h1>
            </div>

            <div className="grid gap-6 bg-white p-4 sm:p-6 md:grid-cols-1">
              <div>
                <h2 className="mb-3 text-base sm:text-lg font-medium text-gray-900">
                  Select a date
                </h2>
                <div className="overflow-x-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    className="w-full sm:w-87.5 md:w-112.5 mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white px-4 pb-6 sm:px-6">
              <button
                onClick={handleSearch}
                className="w-full rounded-xl bg-black py-3 text-sm sm:text-base text-white hover:bg-gray-800"
              >
                Search Events
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
