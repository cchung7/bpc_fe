/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MetricCard from "@/components/Common/MetricCardDashboard";
import { useRecentActivitiesQuery } from "@/src/redux/api/notificationApi";
import { CalendarDays, ClipboardList, UserPlus, Users } from "lucide-react";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";

const DashboardOverview = () => {
  const { data: recentActivities } = useRecentActivitiesQuery({}) as any;
  const activities = recentActivities?.data || [];

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Upcoming Events"
          value={recentActivities?.meta?.upcomingEvents || 0}
          icon={<CalendarDays className="text-blue-600" />}
          bg="bg-blue-100"
        />
        <MetricCard
          title="Total Members"
          value={recentActivities?.meta?.totalMembers || 0}
          icon={<Users className="text-slate-700" />}
          bg="bg-slate-200"
        />
        <MetricCard
          title="Pending Requests"
          value={recentActivities?.meta?.pendingRequests || 0}
          icon={<UserPlus className="text-orange-600" />}
          bg="bg-orange-100"
        />
        <MetricCard
          title="Active Registrations"
          value={recentActivities?.meta?.activeUsers || 0}
          icon={<ClipboardList className="text-green-600" />}
          bg="bg-green-100"
        />
      </div>

      <div className="mt-6">
        <QuickActions />
      </div>

      <div className="mt-6">
        <RecentActivity activities={activities} />{" "}
        {/* Pass the activities data to RecentActivity */}
      </div>
    </div>
  );
};

export default DashboardOverview;
