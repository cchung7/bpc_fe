/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  useApprovedMemberMutation,
  useRejectMemberMutation,
} from "@/src/redux/api/memberApi";
import { Check, X } from "lucide-react";

type AllMembersTableProps = {
  users: any[];
  meta: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export enum AdminApprovedStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

const PendingApprovalTable = ({
  users,
  meta,
  currentPage,
  setCurrentPage,
}: AllMembersTableProps) => {
  const STATUS_UI: Record<AdminApprovedStatus, string> = {
    [AdminApprovedStatus.APPROVED]: "bg-green-100 text-green-700",
    [AdminApprovedStatus.REJECTED]: "bg-red-100 text-red-700",
    [AdminApprovedStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [AdminApprovedStatus.SUSPENDED]: "bg-gray-200 text-gray-700",
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [approvedMember] = useApprovedMemberMutation();
  const [rejectedMember] = useRejectMemberMutation();
  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const handleApprove = async (id: string) => {
    if (!id) {
      toast.error("Please select a member to approve.");
      return;
    }

    try {
      const res = (await approvedMember(id).unwrap()) as any;
      console.log(res);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Approve failed:", error);
      const errorMsg = error?.data?.message || "Something went wrong";
      toast.error(errorMsg || "Failed to approve member");
    }

    setSelectId(null);
    setSelectedItem(null);
  };

  const handleReject = async (id: string) => {
    if (!id) {
      toast.error("Please select a member to reject.");
      return;
    }

    try {
      const res = (await rejectedMember(id).unwrap()) as any;

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Reject failed:", error);
      const errorMsg = error?.data?.message || "Something went wrong";
      toast.error(errorMsg || "Failed to reject member");
    }

    setSelectId(null);
    setSelectedItem(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Member",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {row.original.firstName} {row.original.lastName}
          </span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phoneNumber",
      cell: ({ row }) => (
        <span className="text-gray-900">
          {row.original.phoneNumber || "N/A"}
        </span>
      ),
    },
    {
      header: "Joined",
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return (
          <span className="text-gray-900">
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Events Attended",
      accessorKey: "eventsAttended",
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.adminApprovedStatus ?? "PENDING";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${STATUS_UI[status as AdminApprovedStatus]}
            `}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.adminApprovedStatus === AdminApprovedStatus.PENDING && (
            <>
              <button
                onClick={() => {
                  handleApprove(row.original.id);
                }}
                className="text-green-600 hover:text-green-800"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => {
                  handleReject(row.original.id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-10">Pending Approval</h1>
      <NRTable columns={columns} data={users} />

      <TablePagination
        totalPage={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PendingApprovalTable;
