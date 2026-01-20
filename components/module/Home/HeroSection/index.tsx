"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  "/events/bpc_1a.jpg",
  "/events/bpc_1b.jpg",
  "/events/bpc_1c.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {slides.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Pickleball Hero"
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/20" />

      {/* Arrow buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 cursor-pointer" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 cursor-pointer" />
      </button>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Binnerri Pickleball Club <br />
            </h1>

            <p className="mt-4 text-lg text-gray-200">
              For Faith, Fitness & Community
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-black hover:bg-lime-300 transition"
              >
                Join the Club
              </Link>

              <Link
                href="/events"
                className="rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View Events
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-lime-400" />
                <span>Weekly Open Play</span>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-lime-400" />
                <span>All Skill Levels Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-lime-400" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
