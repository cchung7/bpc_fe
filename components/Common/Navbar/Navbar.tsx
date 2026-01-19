/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/src/redux/api/authApi";
import { logout } from "@/src/redux/features/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Member Directory", href: "/member-directory" },
    { label: "Membership", href: "/membership"},
  ];

  const { data: userData } = useGetMeQuery({}) as any;
  const user = userData?.data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const isActive = (href: string) =>
    href.startsWith("#") ? activeHash === href : pathname === href;

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.location.hash = path;
    } else {
      router.push(path);
    }
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    setSidebarOpen(false);
  };

  return (
    <div className="bg-linear-to-b from-[#dff98d] lg:mb-6 to-[#f1fdcb]">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#dff98d]/80 backdrop-blur-md border-b shadow-sm"
            : "bg-[#f1fdcb]/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex items-center justify-between py-3 px-4 lg:px-6 max-w-7xl">
          <div className="hidden lg:flex items-center gap-32 bg-white rounded-4xl py-2 px-16">
            <div className="shrink-0 transition-transform duration-200 hover:scale-105">
              <Link href="/">
                <Image
                  src="/bpc_logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain rounded-2xl"
                />
              </Link>
            </div>
            <div>
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(item.href)}
                  className={`py-3 px-5 rounded-full transition-all duration-200 active:scale-95 ${
                    isActive(item.href)
                      ? "underline underline-offset-6 decoration-2 text-black"
                      : "hover:bg-gray-100"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-3">
                  <span>
                    <Bell
                      className="w-5 h-5 cursor-pointer text-[#4A5568]"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </span>
                  <button
                    className="rounded-full"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Image
                      src={
                        user.profileImage ||
                        "https://i.ibb.co.com/mVjzdhHW/Rectangle-23852.png"
                      }
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  </button>
                </div>
              ) : (
                <Link href="/register">
                  <Button className="py-6 rounded-3xl">Become a Member</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link href="/" className="shrink-0">
              <Image
                src="/bpc_logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
              aria-label="Open mobile menu"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      <div className="h-16" />

      {/* Modal for Notifications */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-175">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul>
              <li className="py-2">New Event: Yoga Class</li>
              <li className="py-2">Reminder: Membership Renewal</li>
            </ul>
            <div className="mt-4 text-right">
              <Button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="py-2 px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 sm:w-80 bg-[#f5fddb]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/50">
          <Image
            src="/bpc_logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Close mobile menu"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigation(item.href)}
              className={`w-full text-left py-3 px-5 rounded-2xl text-lg font-medium transition-all duration-200 active:scale-95 border ${
                isActive(item.href)
                  ? "bg-[#f5fddb] text-black border-[#090c00]"
                  : "hover:bg-gray-100 border-[#FFDFAA]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile User Section */}
        <div className="px-6 pb-8 pt-4 border-t border-gray-200/50 space-y-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span>
                <Bell className="w-5 h-5 cursor-pointer text-[#4A5568]" />
              </span>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                <Image
                  src={
                    user?.profileImage ||
                    "https://i.ibb.co/com/mVjzdhHW/Rectangle-23852.png"
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.name || "User"}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              variant="default"
              className="w-full gap-2 py-3 text-base font-semibold"
              onClick={() => handleNavigation("/register")}
            >
              Become a Member
            </Button>
          )}
        </div>
      </div>

      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}