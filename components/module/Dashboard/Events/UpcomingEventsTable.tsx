/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

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

const UpcomingEventsTable = () => {
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
            {status !== "Past" && (
              <button className="text-gray-500 hover:text-gray-700">
                <Pencil size={18} />
              </button>
            )}

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize all upcoming events
          </p>
        </div>

        <Link href="/admin/dashboard/events/create-events">
          <Button className="w-fit">+ Create Event</Button>
        </Link>
      </div>

      <div className="rounded-xl">
        <NRTable columns={columns} data={events} />
      </div>

      <div className="flex justify-end">
        <TablePagination
          totalPage={10}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UpcomingEventsTable;