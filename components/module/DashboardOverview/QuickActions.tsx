import { ArrowRight, Bell, Plus, UserCheck } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Event",
      icon: <Plus className="w-5 h-5 text-[#4A5568]" />,
      bgColor: "bg-[#EDF2F7]",
    },
    {
      title: "View Pending Members",
      icon: <UserCheck className="w-5 h-5 text-[#4A5568]" />,
      bgColor: "bg-[#EDF2F7]",
    },
    {
      title: "Send Notification",
      icon: <Bell className="w-5 h-5 text-[#4A5568]" />,
      bgColor: "bg-[#EDF2F7]",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#2D3748]">Quick Actions</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-[#E2E8F0] hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${action.bgColor}`}
              >
                {action.icon}
              </div>
              <span className="font-medium text-[#4A5568]">{action.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#4A5568] transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}