import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
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
  ChevronDown,
} from "lucide-react"
import NewDocButton from "../newDocButton"
import { dashboardItem, menuItems, bottomMenuItems } from "./sidebar-items"
import Activity from "./activity"
import ActivityLabel from "./ActivityLabel"
import NewProjectButton from "../newProjectButton"

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
          <NewProjectButton />
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
            <ActivityLabel />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Activity height="h-[300px] w-full"/>
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