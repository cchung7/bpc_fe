import MetricCard from "@/components/Common/MetricCardDashboard";
import { CalendarDays, ClipboardList, UserPlus, Users } from "lucide-react";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";

const DashboardOverview = () => {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Upcoming Events"
          value={3}
          icon={<CalendarDays className="text-blue-600" />}
          bg="bg-blue-100"
        />
        <MetricCard
          title="Total Members"
          value={8}
          icon={<Users className="text-slate-700" />}
          bg="bg-slate-200"
        />
        <MetricCard
          title="Pending Requests"
          value={3}
          icon={<UserPlus className="text-orange-600" />}
          bg="bg-orange-100"
        />
        <MetricCard
          title="Active Registrations"
          value={4}
          icon={<ClipboardList className="text-green-600" />}
          bg="bg-green-100"
        />
      </div>
      <div className="mt-6">
        <QuickActions />
      </div>
      <div>
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardOverview;