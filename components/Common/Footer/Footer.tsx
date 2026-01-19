import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full">
      <div className="relative h-[60vh] w-full">
        <Image
          src="/images/a.jpg"
          alt="Pickleball Footer"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 h-full mx-auto px-6 sm:px-10 lg:px-14 py-12 flex flex-col justify-between">
          <div className="my-6 border-t border-primary" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-primary text-2xl sm:text-3x1 font-extrabold tracking-tight">
                Pickleball
              </h1>
              <p className="mt-6 text-white/90 text-base sm:text-lg leading-relaxed max-w-md">
                Stay connected with the Pickleball community and never miss an
                event.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-white/90 text-base">
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Company</h3>

                <Link href="/" className="hover:text-primary cursor-pointer">
                  <p className="hover:text-primary cursor-pointer">Home</p>
                </Link>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold">Community</h3>
                <Link href="/member-directory">
                  <p className="hover:text-primary cursor-pointer">
                    Member Directory
                  </p>
                </Link>

                <Link href="/membership">
                  <p className="hover:text-primary cursor-pointer">
                    Membership
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="my-6 border-t border-white/20" />

          <div className="flex flex-col sm:flex-row justify-between items-center text-white/60 text-sm gap-4">
            <p>© {new Date().getFullYear()} Pickleball. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Add social icons here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;