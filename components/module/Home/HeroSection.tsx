import UserCard from "./UserCard";

const HeroSection = () => {
  return (
    <section className="bg-[#f5fddb]">
      <div className="container mx-auto px-4 pt-10 lg:pt-20 pb-28">
        {/* Text Content */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            Featured Events
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Engage with leaders, exchange ideas, and build connections that
            unlock new opportunities.
          </p>

          {/* CTA (optional) */}
          {/* 
          <div className="mt-8">
            <Button className="px-8 py-6 rounded-full text-base">
              See Upcoming Events
            </Button>
          </div> 
          */}
        </div>

        {/* User Cards */}
        <div className="mt-16">
          <UserCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
