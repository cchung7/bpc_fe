/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllmembersByUserQuery } from "@/src/redux/api/memberApi";
import { Mail, Phone, Trophy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Membership from "../Home/Membership";
import PlayerCard from "./MemberCard";

const MemberDirectory = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: membersData } = useGetAllmembersByUserQuery({});
  const players = membersData?.data || [];

  console.log("members", players);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filteredPlayers = players.filter((player: any) => {
    const fullName = `${player.firstName} ${player.lastName}`;

    const searchString = player.paddle
      ? `${fullName} ${player.paddle}`
      : fullName;
    return searchString.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handlePlayerClick = (player: any) => {
    setSelectedMember(player);
    setIsModalOpen(true);
  };

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className="bg-[#f5fddb] pt-6">
      <div className="container mx-auto px-4 mb-6 sm:px-6 lg:px-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold">Member Directory</h1>
          <h3 className="text-lg sm:text-xl mt-2">
            Connect with {players.length} club members
          </h3>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <input
              type="text"
              placeholder="Search by name or paddle type..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-4 py-3 w-full sm:w-1/2 bg-[#ccf64d] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d99b35]"
            />

            {/* <Button className="w-full sm:w-auto py-3 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2">
              <Funnel size={18} />
              Filter
            </Button> */}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-14 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player: any, idx: any) => (
              <div
                key={player.id || idx}
                onClick={() => handlePlayerClick(player)}
              >
                <PlayerCard item={player} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Membership />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-150 flex flex-col p-0 overflow-hidden">
          {selectedMember && (
            <>
              <div className="bg-lime-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
                <Image
                  src={selectedMember.profileImage || "/default-avatar.png"}
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-lime-400 shadow-lg"
                />
                <div className="flex-1">
                  <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </DialogTitle>
                  </DialogHeader>
                  <Badge className="bg-lime-500 text-white hover:bg-lime-600">
                    <Trophy size={16} className="mr-1" />
                    {selectedMember.skillLevel || "Intermediate"}
                  </Badge>
                </div>
              </div>

              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
                {/* <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    About
                  </h3>
                  <p className="text-gray-700">
                    {selectedMember.about || "No bio available"}
                  </p>
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    // {
                    //   label: "Paddle Type",
                    //   value: selectedMember.paddle || "Not specified",
                    //   icon: null,
                    // },
                    {
                      label: "Member Since",
                      value: formatMemberSince(selectedMember.createdAt),
                      icon: null,
                    },
                    // {
                    //   label: "Location",
                    //   value: selectedMember.location || "Not specified",
                    //   icon: MapPin,
                    // },
                    {
                      label: "Skill Level",
                      value: selectedMember.skillLevel || "Intermediate",
                      icon: Trophy,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-4 rounded-lg shadow flex items-center gap-2"
                    >
                      {item.icon && (
                        <item.icon size={18} className="text-gray-600" />
                      )}
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          {item.label}
                        </p>
                        <p className="text-gray-900 font-semibold">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Contact Information
                  </h3>
                  {[
                    { label: "Email", value: selectedMember.email, icon: Mail },
                    {
                      label: "Phone",
                      value: selectedMember.phoneNumber,
                      icon: Phone,
                    },
                  ].map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="bg-lime-100 rounded-full p-3">
                          <item.icon size={20} className="text-lime-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            {item.label}
                          </p>
                          <p className="text-gray-900">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberDirectory;
