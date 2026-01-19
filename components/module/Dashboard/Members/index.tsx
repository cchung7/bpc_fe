/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Users } from "lucide-react";
import { useState } from "react";

import MetricCard from "@/components/Common/MetricCardDashboard";
import Spinner from "@/components/Common/Spinner";
import { useGetAllMembersQuery } from "@/src/redux/api/memberApi";
import AllMembersTable from "./AllMembersTable";

const MembersManagement = () => {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: tableData, isLoading } = useGetAllMembersQuery({
    page: currentPage,
    adminApprovedStatus: "",
    limit,
  }) as any;

  if (isLoading) return <Spinner />;

  const members = tableData?.data ?? [];
  const meta = tableData?.meta ?? {};

  return (
    <div className="mt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Members"
          value={meta?.totalMember ?? 0}
          icon={<Users className="text-white" />}
          bg="bg-slate-600"
        />
        <MetricCard
          title="Pending Approval"
          value={meta?.pendingMember ?? 0}
          icon={<Users className="text-white" />}
          bg="bg-[#bb4d00]"
        />
        <MetricCard
          title="Approved"
          value={meta?.approvedMember ?? 0}
          icon={<Users className="text-white" />}
          bg="bg-[#008236]"
        />
        <MetricCard
          title="Rejected"
          value={meta?.rejectedMember ?? 0}
          icon={<Users className="text-white" />}
          bg="bg-[#c10007]"
        />
      </div>

      <AllMembersTable
        users={members}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MembersManagement;