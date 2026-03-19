"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BriefcaseBusinessIcon,
  BuildingIcon,
  Command,
  ComputerIcon,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Laptop2Icon,
  LocateIcon,
  LocationEdit,
  Map,
  PersonStanding,
  PersonStandingIcon,
  PieChart,
  Settings2,
  Settings2Icon,
  SettingsIcon,
  SquareTerminal,
  User,
  User2,
  UserCog,
  UserPlus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants";
import { IconTableSpark } from "@tabler/icons-react";

// This is sample data.
const data = {
  teams: [
    {
      name: APP_NAME,
      logo: GalleryVerticalEnd,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Device",
      url: "/admin/device",
      icon: Laptop2Icon,
      items: [
        {
          title: "Device",
          url: "/admin/device",
          icon: Laptop2Icon,
        },
        {
          title: "Device Category",
          url: "/admin/device-category",
          icon: ComputerIcon,
        },
        {
          title: "Device Assigned",
          url: "/admin/device-assigned",
          icon: UserPlus,
        },
        {
          title: "Vendor",
          url: "/admin/vendor",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Requirements",
          url: "/admin/requirements",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Procurement",
          url: "/admin/procurement",
          icon: BriefcaseBusinessIcon,
        },
        {
          title: "Purchase Order",
          url: "/admin/purchase-order",
          icon: FileText,
        },
      ],
    },
    {
      title: "Employee",
      url: "/admin/employee",
      icon: PersonStanding,
      items: [
        {
          title: "Employee",
          url: "/admin/employee",
          icon: PersonStandingIcon,
        },
        {
          title: "Department",
          url: "/admin/department",
          icon: BuildingIcon,
        },
        {
          title: "Location",
          url: "/admin/location",
          icon: LocationEdit,
        },
      ],
    },
    {
      title: "User",
      url: "/admin/user",
      icon: User2,
      items: [
        {
          title: "User",
          url: "/admin/user",
          icon: User,
        },
        {
          title: "Role",
          url: "/admin/role",
          icon: UserCog,
        },
        {
          title: "Module",
          url: "/admin/module",
          icon: IconTableSpark,
        },
      ],
    },
    {
      title: "Configuration",
      url: "/admin/configuration",
      icon: SettingsIcon,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    allowedRoutes?: string[];
  };
};

function filterNav(navMain: any[], allowedRoutes: string[]) {
  return navMain
    .map((section) => {
      if (!section.items) {
        return allowedRoutes.includes(section.url) ? section : null;
      }

      const filteredItems = section.items.filter((item: any) =>
        allowedRoutes.includes(item.url),
      );

      if (filteredItems.length === 0) return null;

      return {
        ...section,
        items: filteredItems,
      };
    })
    .filter(Boolean);
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  console.log("SIDEBAR USER:", user);           // 👈 ADD THIS
  console.log("ALLOWED ROUTES:", user?.allowedRoutes);
  const allowedRoutes = user?.allowedRoutes || [];
  const filteredNav = filterNav(data.navMain, allowedRoutes);

  return (
    <Sidebar collapsible="icon" user={user} {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name ?? "User",
            email: user?.email ?? "",
            avatar: user?.image ?? "",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

