"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import UpcomingEventsTable from "./AllEventsTable";

export default function EventsTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      {/* CARD TABS */}
      <TabsList className="grid w-full mb-32 grid-cols-1 gap-4 bg-transparent sm:grid-cols-3">
        <TabsTrigger
          value="upcoming"
          className="data-[state=active]:ring-2 data-[state=active]:ring-primary rounded-xl p-0"
        >
          <Card className="w-full p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <h2 className="text-2xl font-bold">3</h2>
            </div>
            <div className="rounded-lg bg-blue-500 p-2 text-white">
              <Calendar size={18} />
            </div>
          </Card>
        </TabsTrigger>

        <TabsTrigger
          value="total"
          className="data-[state=active]:ring-2 data-[state=active]:ring-primary rounded-xl p-0"
        >
          <Card className="w-full p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Events</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <div className="rounded-lg bg-green-500 p-2 text-white">
              <Calendar size={18} />
            </div>
          </Card>
        </TabsTrigger>

        <TabsTrigger
          value="past"
          className="data-[state=active]:ring-2 data-[state=active]:ring-primary rounded-xl p-0"
        >
          <Card className="w-full p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Past Events</p>
              <h2 className="text-2xl font-bold">4</h2>
            </div>
            <div className="rounded-lg bg-gray-700 p-2 text-white">
              <Calendar size={18} />
            </div>
          </Card>
        </TabsTrigger>
      </TabsList>

      {/* TAB CONTENT */}
      <TabsContent value="upcoming" className="mt-6">
        <UpcomingEventsTable />
      </TabsContent>

      <TabsContent value="total" className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Events</h3>
          <p className="text-muted-foreground">
            All events overview goes here.
          </p>
        </Card>
      </TabsContent>

      <TabsContent value="past" className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Past Events</h3>
          <p className="text-muted-foreground">Past events list goes here.</p>
        </Card>
      </TabsContent>
    </Tabs>
  );
}