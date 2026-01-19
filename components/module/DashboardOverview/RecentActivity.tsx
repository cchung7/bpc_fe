import { cn } from "@/lib/utils";

type ActivityItem = {
  title: string;
  time: string;
  dotColor: string;
};

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      title: "New member registration: Amanda Williams",
      time: "711 days ago",
      dotColor: "bg-[#4A5568]",
    },
    {
      title: "Michael Chen registered for Annual Tech Conference 2024",
      time: "703 days ago",
      dotColor: "bg-[#48BB78]",
    },
    {
      title: "New event created: Community Volunteer Day",
      time: "713 days ago",
      dotColor: "bg-[#4299E1]",
    },
    {
      title: "Member approved: Sarah Johnson",
      time: "716 days ago",
      dotColor: "bg-[#4A5568]",
    },
    {
      title: "Jessica Taylor registered for Networking Mixer",
      time: "709 days ago",
      dotColor: "bg-[#48BB78]",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#2D3748]">
          Recent Activity
        </h2>
      </div>
      <div className="divide-y divide-[#E2E8F0]">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
                activity.dotColor
              )}
            />
            <div className="flex flex-col gap-1">
              <p className="text-[#2D3748] font-medium leading-tight">
                {activity.title}
              </p>
              <span className="text-sm text-[#718096]">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}