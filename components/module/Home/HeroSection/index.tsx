"use client";

import { CalendarDays, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <Image
        src="/images/Hero Image.png"
        alt="Pickleball Player"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/20" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Where Pickleball Players <br />
              Become a Community
            </h1>

            <p className="mt-4 text-lg text-gray-200">
              Join tournaments, social games, and a growing local club
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-black hover:bg-lime-300 transition"
              >
                Join the Club
              </Link>

              <Link
                href="#"
                className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View Events
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-lime-400" />
                <span>100+ Active Members</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-lime-400" />
                <span>Weekly Events</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-lime-400" />
                <span>All Skill Levels Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        <span className="h-2 w-6 rounded-full bg-lime-400" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
      </div>
    </section>
  );
}