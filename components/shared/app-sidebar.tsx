"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/src/assets/logo.png";
import {
  Bell,
  Calendar,
  HandCoins,
  Home,
  InfoIcon,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  user: {
    navMain: [
      {
        title: "Dashboard",
        url: "/user",
        icon: LayoutDashboard,
      },
      {
        title: "Your Profile",
        url: "/user/dashboard/profile",
        icon: User,
      },
      {
        title: "Go Back To Home",
        url: "/",
        icon: Home,
      },
    ],
  },

  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Members Management",
        url: "/admin/dashboard/members",
        icon: HandCoins,
        items: [
          {
            title: "Members",
            url: "/admin/dashboard/members",
            icon: Users,
          },
          {
            title: "Pending Approval",
            url: "/admin/dashboard/members/pending-approval",
            icon: Users,
          },
          {
            title: "Approved",
            url: "/admin/dashboard/members/appproved",
            icon: InfoIcon,
          },
          {
            title: "Rejected",
            url: "/admin/dashboard/members/rejected",
            icon: InfoIcon,
          },
        ],
      },
      {
        title: "Events",
        url: "/admin/dashboard/events",
        icon: Calendar,
      },

      {
        title: "Notifications",
        url: "/admin/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Go Back To User Portal ",
        url: "/",
        icon: Home,
      },
    ],
  },
};

interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-white border-r border-blue-200"
      {...props}
    >
      <SidebarHeader>
        <Link
          href={"/admin/dashboard"}
          className="flex items-center w-full max-h-40 justify-center"
        >
          <Image
            src={Logo.src}
            alt="Logo"
            width={300}
            height={300}
            className="size-auto rounded-2xl"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
