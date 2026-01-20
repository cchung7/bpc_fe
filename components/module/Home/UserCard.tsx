import Image from "next/image";
import Marquee from "react-fast-marquee";

const dammyUsers = [
  {
    avatar:
      "/events/bpc_1a.jpg",
  },
  {
    avatar:
      "/events/bpc_1b.jpg",
  },
  {
    avatar:
      "/events/bpc_1c.jpg",
  },
  {
    avatar:
      "/events/bpc_1d.jpg",
  },
  {
    avatar:
      "/events/bpc_1e.jpg",
  },
  {
    avatar:
      "/events/bpc_1f.jpg",
  },
];

const UserCard = () => (
  <div className="relative">
    <Marquee gradient={true} pauseOnHover={true} speed={50}>
      <div className="flex gap-4 py-10">
        {dammyUsers.map((user, index) => (
          <div key={index} className="flex items-center gap-4 ms-10">
            <div className="relative w-36 h-36 sm:w-28 sm:h-28 md:w-80 md:h-80 rounded-3xl overflow-hidden">
              <Image
                src={user.avatar}
                alt="User Avatar"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        ))}
      </div>
    </Marquee>
  </div>
);

export default UserCard;
