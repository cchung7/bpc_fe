import Image from "next/image";
import Marquee from "react-fast-marquee";

const dammyUsers = [
  {
    avatar:
      "https://framerusercontent.com/images/7l4VUEBnvK69WttT6q0ZCT1x2u4.jpeg?scale-down-to=2048",
  },
  {
    avatar:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
  },
  {
    avatar:
      "https://framerusercontent.com/images/B3JJ6ZUucPsexj459R5ZARkKHcs.jpeg?scale-down-to=2048",
  },
  {
    avatar:
      "https://framerusercontent.com/images/qyN2CKkv6G5gxPKHn8LlwjzAE.jpeg?scale-down-to=1024",
  },
  {
    avatar:
      "https://framerusercontent.com/images/zf2KY4R2f7Wvq4TM9dVsfLBzhz8.png",
  },
  {
    avatar:
      "https://framerusercontent.com/images/5j6KwYErDZMO63uF5f09XuQHd7E.jpeg?scale-down-to=1024",
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