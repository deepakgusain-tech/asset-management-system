"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import React from "react"
import { Item } from "@radix-ui/react-dropdown-menu"
 

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    role?: string; // add new
    items?: {
      title: string
      url: string
      icon?: LucideIcon
      role?: string;   // add new
    }[]
  }[]
}) 
{

  const role = 'employee';    //add new


  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {/* {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.items && item.items.length > 0 ? (<Collapsible
              key={index}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            > */}

                {items
          // Step 2: filter main items based on role
          .filter((item) => !item.role || item.role === role)
          .map((item, index) => (
            <React.Fragment key={index}>
              {item.items && item.items.length > 0 ? (
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >

              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {/* {item.items && item.items?.length > 0 && item.items?.map((subItem) => ( */}
                    {item.items
                    .filter((sub) => !sub.role || sub.role === role)
                    .map((subItem) =>(
                       <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4" />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                    
                      {/* <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            {subItem.icon && <subItem.icon className="w-4 h-4" />}

                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))} */}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>) : (
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            )}
          </React.Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}




