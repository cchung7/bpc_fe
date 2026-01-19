/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { Eye, Trash2 } from "lucide-react";

const events = [
  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },

  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },
  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },
  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },
  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },
  {
    id: "1",
    title: "National Sports Meet",
    date: "Feb 20, 2024",
    time: "18:00",
    location: "Downtown Hotel, Rooftop",
    status: "Upcoming",
    capacity: "87 / 100",
  },
];

const PastEvents = () => {
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
      header: "Event",
      accessorKey: "title",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.title}</span>
      ),
    },
    {
      header: "Date & Time",
      cell: ({ row }) => (
        <span className="text-gray-600">
          {row.original.date} at {row.original.time}
        </span>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }) => (
        <span className="text-gray-600">{row.original.location}</span>
      ),
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
              status === "Upcoming"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }
          `}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
      cell: ({ row }) => (
        <span className="font-medium text-gray-700">
          {row.original.capacity}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className="flex  items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Eye size={18} />
            </button>

            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-10">Past Events</h1>

      <NRTable columns={columns} data={events} />

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

export default PastEvents;