import MetricCard from "@/components/Common/MetricCardDashboard";
import { Users } from "lucide-react";
import RejectedTable from "./RejectedTable";

const RejectedPage = () => {
  return (
    <div className="mt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Members"
          value={3}
          icon={<Users className="text-white" />}
          bg="bg-slate-600"
        />

        <MetricCard
          title="Pending Approval"
          value={8}
          icon={<Users className="text-white" />}
          bg="bg-[#bb4d00]"
        />
        <MetricCard
          title="Approved"
          value={3}
          icon={<Users className="text-white" />}
          bg="bg-[#008236]"
        />
        <MetricCard
          title="Rejected"
          value={4}
          icon={<Users className="text-white" />}
          bg="bg-[#c10007]"
        />
      </div>
      <RejectedTable />
    </div>
  );
};

export default RejectedPage;