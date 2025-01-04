"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CustomSidebarTrigger } from "./sidebar-trigger"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FolderPlus, FilePlus, Clock, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

// Import all the icons and types you need from your sidebar component
import { menuItems, recentActivities, bottomMenuItems } from "./sidebar"

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
        className="w-64 p-4 border-[#999165]/20 ml-2"
      >
        {/* Quick Actions */}
        <div className="space-y-2 mb-4">
          <Button 
            className="w-full justify-start gap-2 bg-[#999165] text-white hover:bg-[#999165]/90"
          >
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 border-[#999165] text-[#999165] hover:bg-[#999165]/10"
          >
            <FilePlus className="h-4 w-4" />
            New Document
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-[#999165] mb-2">Navigation</h4>
          {menuItems.map((item) => (
            <div key={item.label} className="mb-1">
              {item.subRoutes ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="w-full flex items-center justify-between gap-2 text-sm text-[#999165] hover:bg-[#999165]/10 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    side="right"
                    align="start"
                    className="w-48 -mt-9 ml-2"
                  >
                    {item.subRoutes.map((subItem) => (
                      <a 
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center gap-2 text-sm text-[#999165] hover:bg-[#999165]/10 rounded-md p-2"
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
                  className="flex items-center gap-2 text-sm text-[#999165] hover:bg-[#999165]/10 rounded-md p-2"
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
          <h4 className="text-sm font-medium text-[#999165] mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
          </h4>
          <ScrollArea className="h-[120px]">
            {recentActivities.slice(0, 3).map((activity, index) => (
              <div key={index} className="mb-2">
                <div className="text-sm font-medium text-[#999165]">
                  {activity.title}
                </div>
                <div className="text-xs text-[#999165]/70">
                  {activity.action}
                </div>
                <div className="text-xs text-[#999165]/50">
                  {activity.timestamp}
                </div>
                {index < 2 && <Separator className="my-2 bg-[#999165]/10" />}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Bottom Menu */}
        <div>
          {bottomMenuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-sm text-[#999165] hover:bg-[#999165]/10 rounded-md p-2"
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
