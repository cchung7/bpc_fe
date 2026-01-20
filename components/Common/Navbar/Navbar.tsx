/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetMeQuery } from "@/src/redux/api/authApi";
import { useGetMyNotificationsQuery } from "@/src/redux/api/notificationApi";
import { logout } from "@/src/redux/features/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { formatDistanceToNow } from "date-fns";
import { Bell, Clock, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMeQuery({}) as any;
  const { data: getMyNotification } = useGetMyNotificationsQuery({}) as any;
  const currentUser = userData?.data;
  const notifications = getMyNotification?.data || [];

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Members", href: "/member-directory" },
    ...(currentUser ? [] : [{ label: "Membership", href: "/membership" }]),
  ];

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

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
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
        <div className="mx-auto flex items-center justify-center py-3 px-4 lg:px-6 max-w-7xl">
          <div className="hidden lg:flex items-center gap-32 bg-white rounded-full  py-2 px-2">
            <div className="shrink-0 transition-transform duration-200 hover:scale-105">
              <Link href="/">
                <Image
                  src="/bpc_logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain rounded-full"
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

            <div className="relative flex items-center gap-4">
              {/* Notification Bell */}
              {currentUser && (
                <Sheet
                  open={notificationOpen}
                  onOpenChange={setNotificationOpen}
                >
                  <SheetTrigger asChild>
                    <button className="relative p-2 bg-gray-100 rounded-full transition-all duration-200">
                      <Bell className="w-6 h-6 text-gray-700" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs text-white bg-red-500">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent className="w-100 sm:w-135">
                    <SheetHeader>
                      <SheetTitle className="flex items-center justify-between">
                        Notifications
                        {unreadCount > 0 && (
                          <Badge variant="secondary">
                            {unreadCount} unread
                          </Badge>
                        )}
                      </SheetTitle>
                      <SheetDescription>
                        Stay updated with your latest notifications
                      </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                      {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Bell className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-gray-500 font-medium">
                            No notifications yet
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            We&apos;ll notify you when something arrives
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {notifications.map((notification: any) => (
                            <div
                              key={notification.id}
                              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                                notification.isRead
                                  ? "bg-white border-gray-200"
                                  : "bg-blue-50 border-blue-200"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${getNotificationTypeColor(
                                        notification.type
                                      )}`}
                                    >
                                      {notification.type}
                                    </Badge>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-800 font-medium mb-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {formatDistanceToNow(
                                        new Date(notification.createdAt),
                                        { addSuffix: true }
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              )}

              {/* User Profile */}
              {currentUser ? (
                <div
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                  className="relative"
                >
                  <div className="w-12 h-12 mr-2 rounded-full overflow-hidden border-2 border-green-500 cursor-pointer">
                    {currentUser?.profileImage ? (
                      <Image
                        src={currentUser.profileImage}
                        alt={currentUser.userName}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-green-600 text-lg font-semibold">
                        {currentUser.userName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute right-0 top-10 w-60 bg-white border rounded-xl shadow-lg z-50 transform transition-all duration-200 origin-top ${
                      profileOpen
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <ul className="divide-y">
                      <li>
                        <Link
                          href="/user-profile"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          Profile Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 transition"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-x-5">
                  <Link href="/register">
                    <Button
                      className="py-5 bg-primary rounded-3xl"
                      variant="outline"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="py-5 rounded-3xl" variant="outline">
                      Login
                    </Button>
                  </Link>
                </div>
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 sm:w-80 bg-[#f5fddb]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-between`}
      >
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

        <div className="px-6 pb-8 pt-4 border-t border-gray-200/50 space-y-3">
          {currentUser ? (
            <div className="space-y-3">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                    <div className="relative">
                      <Bell className="w-6 h-6 text-gray-700" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-500">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium">Notifications</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-100">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      Notifications
                      {unreadCount > 0 && (
                        <Badge variant="secondary">{unreadCount} unread</Badge>
                      )}
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-100px)] mt-6">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bell className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">
                          No notifications yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((notification: any) => (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${
                              notification.isRead
                                ? "bg-white border-gray-200"
                                : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${getNotificationTypeColor(
                                  notification.type
                                )}`}
                              >
                                {notification.type}
                              </Badge>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-800 font-medium mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                {formatDistanceToNow(
                                  new Date(notification.createdAt),
                                  { addSuffix: true }
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                <Image
                  src={
                    currentUser?.profileImage ||
                    "https://i.ibb.co/com/mVjzdhHW/Rectangle-23852.png"
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {currentUser.name || "User"}
                  </p>
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
              Sign Up 
            </Button>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
