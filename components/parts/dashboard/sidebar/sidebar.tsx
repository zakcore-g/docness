"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
        href: '/dashboard/documents/shared',
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

// Mock recent activities
export const recentActivities = [
  {
    title: "Sales Report Q4 2023",
    action: "Edited by John Doe",
    timestamp: "2 hours ago"
  },
  {
    title: "Marketing Strategy 2024",
    action: "Commented by Sarah Smith",
    timestamp: "3 hours ago"
  },
  {
    title: "Product Roadmap",
    action: "Shared by Mike Johnson",
    timestamp: "5 hours ago"
  },
  {
    title: "Budget Planning",
    action: "Created by Finance Team",
    timestamp: "1 day ago"
  },
  {
    title: "Team Meeting Notes",
    action: "Updated by Alice Brown",
    timestamp: "1 day ago"
  },
  {
    title: "Client Presentation",
    action: "Reviewed by Management",
    timestamp: "2 days ago"
  },
  // Add more items to demonstrate scrolling
]

const DashboardSidebar = () => {
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
          <SidebarGroupLabel className="flex items-center gap-2 text-black">
            <Clock className="h-4 w-4" />
            Recent Activity
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[200px] w-full rounded-md">
              <div className="px-1">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-sm font-medium text-black">
                      {activity.title}
                    </div>
                    <div className="text-xs text-black/70">
                      {activity.action}
                    </div>
                    <div className="text-xs text-black/50">
                      {activity.timestamp}
                    </div>
                    {index < recentActivities.length - 1 && (
                      <Separator className="my-2 bg-black/10" />
                    )}
                  </div>
                ))}
              </div>
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