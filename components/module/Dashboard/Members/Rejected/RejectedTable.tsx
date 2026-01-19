"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  count: number;
  status: "Approved" | "Pending" | "Rejected";
}

const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    date: "Nov 15, 2023",
    count: 8,
    status: "Rejected",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Rejected",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Rejected",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Rejected",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Rejected",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    date: "Dec 1, 2023",
    count: 0,
    status: "Rejected",
  },
];

const RejectedTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = () => {
    if (selectedUser) {
      toast.success(`${selectedUser.name} removed successfully`);
    }
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleApprove = (user: User) => {
    toast.success(`${user.name} approved`);
  };

  const columns: ColumnDef<User>[] = [
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

        const statusStyles = {
          Approved: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Rejected: "bg-red-100 text-red-700",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
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
            onClick={() => handleApprove(row.original)}
            className="text-green-600 hover:text-green-800"
            title="Approve"
          >
            <Check size={18} />
          </button>

          <button
            onClick={() => {
              setSelectedUser(row.original);
              setModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mt-10">Rejected</h1>

      <NRTable columns={columns} data={users} />

      <DeleteConfirmationModal
        name={selectedUser?.name ?? ""}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDelete}
      />
      <TablePagination totalPage={10} currentPage={1} onPageChange={() => {}} />
    </div>
  );
};

export default RejectedTable;