/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

const PlayerCard = ({ item }: { item: any }) => {
  const levelColorMap: Record<string, string> = {
    beginner: "bg-[#dcfce7] text-[#016630]",
    intermediate: "bg-[#f3e8ff] text-purple-700",
    advanced: "bg-[#ffedd4] text-[#9f2d00]",
    expert: "bg-[#fee2e2] text-[#991b1b]",
  };

  const formatSkillLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <div className="rounded-2xl bg-white shadow-md border hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
      <div className="relative h-90 w-full">
        <Image
          src={item.profileImage || "/default-avatar.png"}
          alt={`${item.firstName} ${item.lastName}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl sm:text-2xl font-semibold">
          {item.firstName} {item.lastName}
        </h3>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium 
          ${
            levelColorMap[item.skillLevel?.toLowerCase()] ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {formatSkillLevel(item.skillLevel || "intermediate")}
        </span>

        {/* <div>
          <p className="text-sm text-gray-500">Paddle</p>
          <p className="font-medium text-gray-900">
            {item.paddle || "Not specified"}
          </p>
        </div> */}

        {/* <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} />
          <span>{item.location || "Location not set"}</span>
        </div> */}
      </div>
    </div>
  );
};

export default PlayerCard;
