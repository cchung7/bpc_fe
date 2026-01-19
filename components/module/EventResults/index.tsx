import EventsCard from "../Home/Events/EventsCard";

const dammyEvents = [
  {
    id: "1",
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/vxywP849/Court-Image.png",
    title: "Semi-indoor courts",
    description:
      "Covered from rain but open to airflow, semi-indoor courts offer a balanced experience",
    time: "7:00 pm - 10:00 pm",
    location: "Herbst Theatre, 401 Van Ness Ave, San Francisco",
    price: "59$",
    isPaid: false,
  },
];

const EventResults = () => {
  return (
    <div className="bg-[#f7fde2] pt-8">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-4">Upcoming Events</h1>
        <p>
          Browse our curated list of padel courts, check real-time availability,
          <br />
          and secure your slot in seconds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 mb-20">
          {dammyEvents.map((event, index) => (
            <EventsCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventResults;