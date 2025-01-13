
import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CustomSidebarTrigger } from "./sidebar-trigger"
import { useSidebar } from "@/components/ui/sidebar"


// Import all the icons and types you need from your sidebar component
import NewDocButton from "../newDocButton"
import { bottomMenuItems, menuItems } from "./sidebar-items"
import Activity from "./activity"
import ActivityLabel from "./ActivityLabel"
import NewProjectButton from "../newProjectButton"
import { ChevronRight } from "lucide-react"

export function HoverSidebar() {
  const { open } = useSidebar()

  if (open) {
    return <CustomSidebarTrigger />
  }

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div>
          <CustomSidebarTrigger />
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        side="bottom"
        align="start" 
        sideOffset={16}
        className="w-64 p-4 border-black/20 ml-2 bg-white"
      >
        {/* Quick Actions */}
        <div className="space-y-2 mb-4">
          <NewProjectButton />
          <NewDocButton />
        </div>

        {/* Navigation Links */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-black mb-2">Navigation</h4>
          {menuItems.map((item) => (
            <div key={item.label} className="mb-1">
              {item.subRoutes ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="w-full flex items-center justify-between gap-2 text-sm text-black hover:bg-[#faf7ff] rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    side="bottom"
                    align="start"
                    className="w-48 -mt-9 ml-2 bg-white"
                  >
                    {item.subRoutes.map((subItem) => (
                      <a 
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center gap-2 text-sm text-black hover:bg-[#faf7ff] rounded-md p-2"
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.label}</span>
                      </a>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-black hover:bg-[#faf7ff] rounded-md p-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm font-medium text-black mb-2">
            <ActivityLabel />
          </div>
          <Activity height="h-[200px] w-full"/>
        </div>

        {/* Bottom Menu */}
        <div>
          {bottomMenuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-sm text-black hover:bg-[#faf7ff] rounded-md p-2"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}