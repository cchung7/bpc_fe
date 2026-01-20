import { CalendarIcon, MapPinIcon, User2 } from "lucide-react";

const TournamentCard = ({
  tournament: { title, date, location, totalRegister },
}: {
  tournament: {
    title: string;
    date: string;
    location: string;
    totalRegister: number;
    id: string;
  };
}) => {
  // Format the date to a more readable format (only showing date)
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="flex items-center mb-2 text-gray-500">
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>{formattedDate}</span> {/* Displaying only the date */}
      </div>

      <div className="flex items-center mb-2 text-gray-500">
        <MapPinIcon className="w-5 h-5 mr-2" />
        <span>{location}</span>
      </div>

      <div className="flex items-center mb-4 text-gray-500">
        <User2 className="w-5 h-5 mr-2" />
        <span>{totalRegister}</span>
      </div>

      {/* Uncomment this if you want to add a link to the event details */}
      {/* <Link href={`/events/${tournament.id}`}>
        <button className="w-full bg-[#ccf64d] hover:bg-[#b8e040] text-black font-medium py-2 rounded-lg">
          View Details
        </button>
      </Link> */}
    </div>
  );
};

export default TournamentCard;
