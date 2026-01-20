/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";

import TablePagination from "@/components/ui/core/NRTable/TablePagination";

import Spinner from "@/components/Common/Spinner";
import { NRTable } from "@/components/ui/core/NRTable";
import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "@/src/redux/api/eventApi";

const AllEventsTable = () => {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteEvent] = useDeleteEventMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const {
    data: eventsData,
    isLoading,
    isError,
  } = useGetAllEventsQuery({
    page: currentPage,
    limit,
    currentStatus: "",
  }) as any;

  const events = eventsData?.data || [];
  const meta = eventsData?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await deleteEvent(selectedId).unwrap();
      if (res.success) {
        toast.success(res.message || "Event deleted successfully");
        setModalOpen(false);
        setSelectedId(null);
        setSelectedTitle(null);
      } else {
        toast.error(res.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete event");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Event",
      accessorKey: "title",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      header: "Date & Time",
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            at {row.original.time}
          </span>
        );
      },
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const isPast = new Date(row.original.date) < new Date();
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isPast ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-700"
            }`}
          >
            {isPast ? "Past" : "Upcoming"}
          </span>
        );
      },
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
      cell: ({ row }) => row.original.capacity ?? "N/A",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const isPast = new Date(row.original.date) < new Date();
        return (
          <div className="flex items-center justify-center gap-2">
            {!isPast && (
              <Link href={`/admin/dashboard/events/${row.original.id}`}>
                <button
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Edit"
                >
                  <SquarePen className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </Link>
            )}

            {/* <button
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="View"
              >
                <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button> */}

            <button
              className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
              title="Delete"
              onClick={() => {
                setSelectedId(row.original.id);
                setSelectedTitle(row.original.title);
                setModalOpen(true);
              }}
            >
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Total Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize all events
          </p>
        </div>

        <Link href="/admin/dashboard/events/create-events">
          <Button>
            <Plus /> Create Event
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {isLoading && (
          <div className="p-8 text-center text-muted-foreground">
            <Spinner />
          </div>
        )}

        {!isLoading && isError && (
          <div className="p-8 text-center text-red-500">
            Failed to load events
          </div>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No events found
          </div>
        )}

        {!isLoading && !isError && events.length > 0 && (
          <NRTable columns={columns} data={events} />
        )}
      </div>

      {meta && !isLoading && events.length > 0 && (
        <div className="flex justify-end">
          <TablePagination
            totalPage={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <DeleteConfirmationModal
        name={selectedTitle}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AllEventsTable;
