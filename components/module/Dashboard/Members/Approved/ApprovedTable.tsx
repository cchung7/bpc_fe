/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { Ban } from "lucide-react";

const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    date: "Nov 15, 2023",
    count: 8,
    status: "Approved",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Approved",
  },
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    date: "Nov 15, 2023",
    count: 8,
    status: "Approved",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Approved",
  },
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    date: "Nov 15, 2023",
    count: 8,
    status: "Approved",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Approved",
  },
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    date: "Nov 15, 2023",
    count: 8,
    status: "Approved",
  },
];

const ApprovedTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = () => {
    console.log("Delete item with ID:", selectId);
    console.log("Delete item name:", selectedItem);
    if (selectId) {
      toast.success("Item deleted successfully.");
    }
    setModalOpen(false);
    setSelectId(null);
    setSelectedItem(null);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Member",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {row.original.name}
          </span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Joined",
      accessorKey: "date",
    },
    {
      header: "Count",
      accessorKey: "count",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              status === "Approved"
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
          <button className="text-red-500 hover:text-red-700">
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
      <TablePagination totalPage={10} currentPage={1} onPageChange={() => {}} />
    </div>
  );
};

export default ApprovedTable;