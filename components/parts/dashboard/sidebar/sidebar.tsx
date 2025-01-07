"use client"

import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FolderOpen, 
  Settings,
  UserCircle,
  Share2,
  Shield,
  History,
  Lock,
  ChevronDown,
  Clock,
  HelpCircle,
  Trash,
  FolderKanban,
  FolderPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import NewDocButton from "../newDocButton"
import { useRecentActivities } from "@/hooks/useRecentActivities"
import { useUser } from "@clerk/nextjs"


// Separate dashboard item for header
export const dashboardItem = {
  label: 'Dashboard',
  icon: LayoutDashboard,
  href: '/dashboard',
  color: "text-black"
}

// Rest of the menu items
export const menuItems = [
  {
    label: 'Projects',
    icon: FolderKanban,
    href: '/dashboard/projects',
    color: "text-black",
    subRoutes: [
      {
        label: 'Project 1',
        icon: FileText,
        href: '/dashboard/projects/1',
        color: "text-black"
      }
    ]
  },
  {
    label: 'Documents',
    icon: FileText,
    href: '/dashboard/documents',
    color: "text-black",
    subRoutes: [
      {
        label: 'Personal Documents',
        icon: UserCircle,
        href: '/dashboard/documents/personal',
        color: "text-black"
      },
      {
        label: 'Shared Documents',
        icon: Share2,
        href: '/dashboard/documents/',
        color: "text-black"
      }
    ]
  },
  {
    label: 'Collaboration',
    icon: Users,
    href: '/dashboard/collaboration',
    color: "text-black",
    subRoutes: [
      {
        label: 'Team Access',
        icon: Shield,
        href: '/dashboard/collaboration/team-access',
        color: "text-black"
      },
      {
        label: 'Version History',
        icon: History,
        href: '/dashboard/collaboration/history',
        color: "text-black"
      }
    ]
  },
  {
    label: 'Document Library',
    icon: FolderOpen,
    href: '/dashboard/library',
    color: "text-black",
    subRoutes: [
      {
        label: 'Templates',
        icon: FileText,
        href: '/dashboard/library/templates',
        color: "text-black"
      },
      {
        label: 'Access Control',
        icon: Lock,
        href: '/dashboard/library/access',
        color: "text-black"
      }
    ]
  },
]

// Bottom menu items
export const bottomMenuItems = [
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: "text-black"
  },
  {
    label: 'Trash',
    icon: Trash,
    href: '/dashboard/trash',
    color: "text-black"
  },
  {
    label: 'Help',
    icon: HelpCircle,
    href: '/dashboard/help',
    color: "text-black"
  }
]

const DashboardSidebar = () => {
  const { isSignedIn, user } = useUser();
  const userId = isSignedIn ? user?.id : null
  const { activities, loading, error } = useRecentActivities(userId);
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r border-black/10 bg-white">
      <SidebarHeader className="border-b border-black/20 pb-3.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={dashboardItem.href} className={dashboardItem.color}>
                <dashboardItem.icon className="h-4 w-4" />
                <span>{dashboardItem.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <div className="mb-4 space-y-2 px-2">
          <Button 
            className="w-full justify-start gap-2 bg-black text-white hover:bg-black/90"
          >
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
          <NewDocButton />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.subRoutes ? (
                    <Collapsible className="w-full group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className={item.color}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subRoutes.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.href} className={subItem.color}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.label}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.href} className={item.color}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-black flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
            {activities?.length > 0 && (
              <span className="ml-auto text-xs bg-black/5 px-2 py-0.5 rounded-full">
                {activities.length}
              </span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[300px] w-full">
              {loading ? (
                <div className="flex items-center justify-center h-20 text-sm text-black/70">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Loading activities...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-20 text-sm text-red-500 p-4">
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
                <div className="space-y-1 p-1">
                  {activities.map((activity, i) => (
                    <div key={activity.id || i} className="relative group">
                      <a 
                        href={activity.documentUrl}
                        className="block rounded-md transition-all duration-200 hover:bg-[#faf7ff] hover:shadow-sm"
                      >
                        <div className="p-3 space-y-2">
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
                      {i < activities.length - 1 && (
                        <div className="absolute bottom-0 left-3 right-3 h-px bg-black/5" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className={item.color}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSidebar