/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NRTable } from "@/components/ui/core/NRTable";
import { useGetAllSpeakerQuery } from "@/src/redux/api/eventApi";
import Image from "next/image";
import Link from "next/link";

export enum AdminApprovedStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  createdAt?: string | null;
  eventsAttended?: number | null;
  adminApprovedStatus?: AdminApprovedStatus | null;
};

const SpeakersManagement = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { data: getAllSpeakerData } = useGetAllSpeakerQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const speakers = getAllSpeakerData?.data || [];

  const columns: ColumnDef<any>[] = [
    {
      header: "Profile Picture",
      cell: ({ row }) => (
        <div>
          <Image
            src={row.original.image}
            alt="Profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      header: "Speaker Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {row.original.name}
          </span>
        </div>
      ),
    },

    {
      header: "Add Date",
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
      header: "Description",
      accessorKey: "description",
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">All Speakers</h1>
        <Link href="/admin/dashboard/speakers/create-speaker">
          <Button>
            <span className="mr-2">Add Speaker</span>
          </Button>
        </Link>
      </div>
      <NRTable columns={columns} data={speakers} />
    </div>
  );
};

export default SpeakersManagement;
