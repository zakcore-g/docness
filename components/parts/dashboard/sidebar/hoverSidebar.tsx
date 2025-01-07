"use client"

import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CustomSidebarTrigger } from "./sidebar-trigger"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderPlus, Clock, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { useRecentActivities } from "@/hooks/useRecentActivities"
import { useUser } from "@clerk/nextjs"

// Import all the icons and types you need from your sidebar component
import { menuItems, bottomMenuItems } from "./sidebar"
import NewDocButton from "../newDocButton"

export function HoverSidebar() {
  const { open } = useSidebar()
  const { isSignedIn, user } = useUser();
  const userId = isSignedIn ? user?.id : null;
  const { activities, loading, error } = useRecentActivities(userId);

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
          <Button 
            className="w-full justify-start gap-2 bg-black text-white hover:bg-black/90"
          >
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
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
            <Clock className="h-4 w-4" />
            Recent Activity
            {activities?.length > 0 && (
              <span className="ml-auto text-xs bg-black/5 px-2 py-0.5 rounded-full">
                {activities.length}
              </span>
            )}
          </div>
          <ScrollArea className="h-[200px] w-full">
            {loading ? (
              <div className="flex items-center justify-center h-20 text-sm text-black/70">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Loading activities...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-20 text-sm text-red-500">
                <div className="flex flex-col items-center gap-2">
                  <span>Error loading activities</span>
                  <span className="text-xs text-red-400">{error.message}</span>
                </div>
              </div>
            ) : !activities || activities.length === 0 ? (
              <div className="flex items-center justify-center h-20 text-sm text-black/70">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-4 w-4 opacity-50" />
                  <span>No recent activities</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {activities.slice(0, 3).map((activity, i) => (
                  <div key={activity.id || i} className="relative group">
                    <a 
                      href={activity.documentUrl}
                      className="block rounded-md transition-all duration-200 hover:bg-[#faf7ff] hover:shadow-sm"
                    >
                      <div className="p-2 space-y-1.5">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium leading-none group-hover:text-purple-600 transition-colors">
                            {activity.title}
                          </h4>
                          <span className="text-xs text-black/50 whitespace-nowrap ml-2">
                            {activity.timestamp}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-black/80">
                            {activity.documentTitle}
                          </p>
                          <p className="text-xs text-black/60">
                            {activity.action}
                          </p>
                        </div>
                      </div>
                    </a>
                    {i < activities.slice(0, 3).length - 1 && (
                      <div className="absolute bottom-0 left-2 right-2 h-px bg-black/5" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
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