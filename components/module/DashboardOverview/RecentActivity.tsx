/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

export function RecentActivity({ activities }: any) {
  const getDotColor = (activityType: string) => {
    switch (activityType) {
      case "GENERAL":
        return "bg-blue-500";
      case "EVENT":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#2D3748]">
          Recent Activity
        </h2>
      </div>
      <div className="divide-y divide-[#E2E8F0]">
        {activities.slice(0, 5).map((activity: any, index: number) => (
          <div
            key={index}
            className="px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
                getDotColor(activity.activityType) // Dynamic dot color
              )}
            />
            <div className="flex flex-col gap-1">
              <p className="text-[#2D3748] font-medium leading-tight">
                {activity.description}
              </p>
              <span className="text-sm text-[#718096]">
                {new Date(activity.createdAt).toLocaleString()}{" "}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}