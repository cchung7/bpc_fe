/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { useDeleteMemberMutation } from "@/src/redux/api/memberApi";
import { Ban } from "lucide-react";

export enum AdminApprovedStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

const ApprovedTable = ({ users, meta, currentPage, setCurrentPage }: any) => {
  const [deleteMember] = useDeleteMemberMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const handleDelete = async () => {
    if (!selectId) {
      toast.error("Select an item to delete.");
      return;
    }

    try {
      const res = (await deleteMember(selectId).unwrap()) as any;

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.error("Delete failed:", error);
      const errorMsg = error?.data?.message || "Something went wrong";
      toast.error(errorMsg || "Failed to delete event");
    }

    setModalOpen(false);
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
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.adminApprovedStatus;

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
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
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              setSelectId(row.original.id);
              setSelectedItem(row.original.name);
              setModalOpen(true);
            }}
          >
            <Ban size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-10">Approved</h1>
      <NRTable columns={columns} data={users} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDelete}
      />

      <TablePagination
        totalPage={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ApprovedTable;