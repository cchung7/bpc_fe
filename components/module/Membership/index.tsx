import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Membership from "../Home/Membership";

const features = [
  {
    title: "31 Total Courts",
    desc: "Play day or night on our expansive, well-maintained courts.",
    icon: "/logo/member/tennis-racket.png",
  },
  {
    title: "15 Outdoor Clay",
    desc: "Enjoy the classic game on our beautiful outdoor clay courts.",
    icon: "/logo/member/mountain.png",
  },
  {
    title: "6 Indoor Cali-Clay",
    desc: "Perfect playing conditions, no matter the weather outside.",
    icon: "/logo/member/home-10.png",
  },
  {
    title: "Pro Shop",
    desc: "Get the latest gear and stringing services from our on-site experts.",
    icon: "/logo/member/store-02.png",
  },
  {
    title: "20+ Professionals",
    desc: "Learn from the best with our team of certified professionals.",
    icon: "/logo/member/mortarboard-01.png",
  },
  {
    title: "Clinics & Lessons",
    desc: "Adult and junior programs available for all ages and skill levels.",
    icon: "/logo/member/user-group-02.png",
  },
  {
    title: "League Play",
    desc: "Compete in USTA, ALTA, and Triangle leagues throughout the year.",
    icon: "/logo/member/award-02.png",
  },
  {
    title: "Tournaments",
    desc: "Challenge yourself in our competitive year-round tournaments.",
    icon: "/logo/member/champion.png",
  },
  {
    title: "8 Hard Courts",
    desc: "A fast-paced game on our professional-grade courts.",
    icon: "/logo/member/coffee-02.png",
  },
];

const worldClass = [
  {
    title: "Fitness Center",
    desc: "State-of-the-art equipment for strength and conditioning.",
    icon: "/logo/member/dumbbell-02.png",
  },
  {
    title: "Swimming Pool",
    desc: "Relax or train in our beautifully maintained pool.",
    icon: "/logo/member/swimming.png",
  },
  {
    title: "Hard Courts",
    desc: "Fast-paced play on professional-grade courts.",
    icon: "/logo/member/grid-table.png",
  },
];

const MembershipPage = () => {
  return (
    <>
      <section className="relative h-[80vh] w-full">
        <Image
          src="/images/a.jpg"
          alt="Membership Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight">
            Membership
          </h1>
          <p className="mt-6 max-w-2xl text-white/90 text-base sm:text-lg lg:text-xl">
            More than a club. A community where pickleball, fitness, and social life
            come together.
          </p>
        </div>
      </section>
      <section className="py-20 px-4 container mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Binnerri Pickleball Club
            </h2>
            <p className="text-gray-600 text-lg">
              Year-round indoor pickleball on 31 courts with adult and junior programs for
              every level.
            </p>
          </div>

          <Image
            src="/images/Rectangle 51.png"
            width={600}
            height={600}
            alt="Pickleball"
            className="rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="py-20 px-4 container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-100 group-hover:bg-lime-200 transition">
                  <Image
                    src={item.icon}
                    height={22}
                    width={22}
                    alt={item.title}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            World-Class Amenities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the premier facilities that elevate your club experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {worldClass.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-100 group-hover:bg-lime-200 transition">
                  <Image
                    src={item.icon}
                    height={22}
                    width={22}
                    alt={item.title}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 container mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Social Activities</h2>
            <p className="text-gray-600 text-lg mb-8">
              A vibrant calendar of events that brings members together.
            </p>

            {[
              "Monthly Adult Mixers and Special Events",
              "Social Events Year-Round",
              "Holiday Play Days and Parties",
              "Music Events on the Patio",
            ].map((text, i) => (
              <div key={i} className="mb-6">
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="text-lime-500 mt-1" size={22} />
                  <h3 className="font-semibold text-lg">{text}</h3>
                </div>
                <p className="text-gray-600 ms-8 text-sm">
                  Enjoy meaningful connections and memorable moments.
                </p>
              </div>
            ))}
          </div>

          <Image
            src="/images/Rectangle 522.png"
            width={500}
            height={500}
            alt="Social Events"
            className="rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] mx-4 sm:mx-8 mb-20 rounded-2xl overflow-hidden">
        <Image
          src="/images/Rectangle 51.png"
          alt="Join Membership"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="bg-white/90 w-full sm:w-4/5 md:w-3/5 backdrop-blur-lg rounded-2xl px-6 sm:px-10 md:px-14 py-8 sm:py-12 md:py-16 text-center shadow-xl">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-4">
              We Would Love to Have You as a Member
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-lg mx-auto mb-6 leading-relaxed">
              Join a community committed to pickleball, fitness, and lifelong
              friendships.
            </p>

            <Link href="/register">
              <button className="bg-primary text-black rounded-full px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 font-semibold hover:bg-primary/90 transition">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Membership />
    </>
  );
};

export default MembershipPage;
