"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BriefcaseBusinessIcon,
  BuildingIcon,
  Command,
  ComputerIcon,
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
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { APP_NAME } from "@/lib/constants"
import { IconTableSpark } from "@tabler/icons-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: APP_NAME,
      logo: GalleryVerticalEnd,
      plan: "",
    }
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
      ]
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
      ]
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
      ]
    },
    {
      title: "Configuration",
      url: "/admin/configuration",
      icon: SettingsIcon,
    }
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
