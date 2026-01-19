/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import Spinner from "@/components/Common/Spinner";
import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/core/NRModal/DeleteConfirmationModal";
import { NRTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "@/src/redux/api/eventApi";

const ITEMS_PER_PAGE = 8;

const PastEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteEvent] = useDeleteEventMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const {
    data: eventsData,
    isLoading,
    isError,
  } = useGetAllEventsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    currentStatus: "PAST",
  });

  const events = eventsData?.data || [];
  const meta = eventsData?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedEvent({ id, title });
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;

    try {
      const res = await deleteEvent(selectedEvent.id).unwrap();
      toast.success(res.message || "Event deleted successfully");
      setModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete event");
    }
  };

  const isPastEvent = (date: string) => new Date(date) < new Date();

  const formatEventDate = (date: string, time: string) => {
    const eventDate = new Date(date);
    return `${eventDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })} at ${time}`;
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
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatEventDate(row.original.date, row.original.time)}
        </span>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const isPast = row.original.currentStatus === "PAST";
        console.log("isPast", isPast);
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
        const isPast = isPastEvent(row.original.date);
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
            {/* 
            <button
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="View"
            >
              <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button> */}

            <button
              className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
              title="Delete"
              onClick={() =>
                handleDeleteClick(row.original.id, row.original.title)
              }
            >
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        );
      },
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <Spinner />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="p-8 text-center text-red-500">
          Failed to load events
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          No events found
        </div>
      );
    }

    return <NRTable columns={columns} data={events} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Past Events</h1>
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

      <div className="rounded-xl border bg-card">{renderContent()}</div>

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
        name={selectedEvent?.title || null}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default PastEvents;