/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ApproveConfirmationModal from "@/components/ui/core/NRModal/ApproveConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { useApprovedMemberMutation } from "@/src/redux/api/memberApi";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  eventsAttended: number;
  adminApprovedStatus: string;
}

export enum AdminApprovedStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

const STATUS_UI = {
  [AdminApprovedStatus.PENDING]: "bg-yellow-100 text-yellow-700",
  [AdminApprovedStatus.APPROVED]: "bg-green-100 text-green-700",
  [AdminApprovedStatus.REJECTED]: "bg-red-100 text-red-700",
  [AdminApprovedStatus.SUSPENDED]: "bg-gray-100 text-gray-700",
};

const RejectedTable = ({ users, meta, currentPage, setCurrentPage }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const [approvedMember] = useApprovedMemberMutation();

  const handleApprove = async () => {
    if (selectedUser) {
      try {
        const res = await approvedMember(selectedUser.id).unwrap();

        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error("Failed to approve user");
        }
      } catch (error) {
        console.error("Approval failed:", error);
        toast.error("An error occurred while approving the user");
      }

      setModalOpen(false);
      setSelectedUser(null);
    }
  };

  // const handleApprove = (user: User) => {
  //   // Simulate approving the user
  //   toast.success(`${user.firstName} ${user.lastName} approved`);

  //   // You can also update the user status here if needed
  //   // approvedMember(user.id);
  // };

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
      accessorKey: "phone",
      cell: ({ row }) => (
        <span className="text-gray-900">{row.original.phone}</span>
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
              ${STATUS_UI[status as AdminApprovedStatus]}`}
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
          <button
            onClick={() => {
              setSelectId(row.original.id);
              setSelectedItem(
                `${row.original.firstName} ${row.original.lastName}`
              );
              setSelectedUser(row.original);
              setModalOpen(true);
            }}
            className="text-green-500 hover:text-green-700"
          >
            <Check size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mt-10">Rejected</h1>

      <NRTable columns={columns} data={users} />

      <ApproveConfirmationModal
        name={selectedItem ?? ""}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleApprove}
        title="Approve Member"
      />
      <TablePagination
        totalPage={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RejectedTable;
