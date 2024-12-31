'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Menu, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  PlusCircle, 
  LucideIcon,
  Share2,
  Shield,
  History,
  FolderOpen,
  UserCircle,
  Lock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: string[];
}

interface Route {
  label: string;
  icon: LucideIcon;
  href: string;
  color: string;
  subRoutes?: Route[];
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes: Route[] = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-[#999165]"
    },
    {
      label: 'Documents',
      icon: FileText,
      href: '/dashboard/documents',
      color: "text-[#999165]",
      subRoutes: [
        {
          label: 'Personal Documents',
          icon: UserCircle,
          href: '/dashboard/documents/personal',
          color: "text-[#999165]"
        },
        {
          label: 'Shared Documents',
          icon: Share2,
          href: '/dashboard/documents/shared',
          color: "text-[#999165]"
        }
      ]
    },
    {
      label: 'Collaboration',
      icon: Users,
      href: '/dashboard/collaboration',
      color: "text-[#999165]",
      subRoutes: [
        {
          label: 'Team Access',
          icon: Shield,
          href: '/dashboard/collaboration/team-access',
          color: "text-[#999165]"
        },
        {
          label: 'Version History',
          icon: History,
          href: '/dashboard/collaboration/history',
          color: "text-[#999165]"
        }
      ]
    },
    {
      label: 'Document Library',
      icon: FolderOpen,
      href: '/dashboard/library',
      color: "text-[#999165]",
      subRoutes: [
        {
          label: 'Templates',
          icon: FileText,
          href: '/dashboard/library/templates',
          color: "text-[#999165]"
        },
        {
          label: 'Access Control',
          icon: Lock,
          href: '/dashboard/library/access',
          color: "text-[#999165]"
        }
      ]
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: "text-[#999165]"
    },
  ];

  return (
    <TooltipProvider>
      <>
        {/* Mobile Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed left-4 top-4 z-40 bg-[#fdf9ec] border border-[#999165]/20 hover:bg-[#999165]/10"
            >
              <Menu className="h-6 w-6 text-[#999165]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#fdf9ec] p-0">
            <SidebarContent routes={routes} pathname={pathname} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className={cn("hidden md:flex md:flex-col", className)}>
          <SidebarContent routes={routes} pathname={pathname} />
        </div>
      </>
    </TooltipProvider>
  );
}

function NavItem({ route, pathname, isChild = false }: { 
  route: Route; 
  pathname: string;
  isChild?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === route.href;

  if (route.subRoutes) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive ? "bg-[#999165] text-white" : "hover:bg-[#999165]/10 text-[#999165]"
            )}
          >
            <div className="flex items-center gap-2">
              <route.icon className={cn("h-5 w-5", isActive ? "text-white" : route.color)} />
              {route.label}
            </div>
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "transform rotate-90"
            )} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 space-y-1 mt-1">
          {route.subRoutes.map((subRoute) => (
            <NavItem key={subRoute.href} route={subRoute} pathname={pathname} isChild />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={route.href}
          className={cn(
            "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            isActive 
              ? "bg-[#999165] text-white" 
              : "hover:bg-[#999165]/10 text-[#999165]",
            isChild && "text-sm"
          )}
        >
          <div className="flex items-center gap-2">
            <route.icon className={cn("h-5 w-5", isActive ? "text-white" : route.color)} />
            {route.label}
          </div>
          {route.label === 'Shared Documents' && (
            <Badge className="bg-[#fff300] text-black hover:bg-[#fff300]/90">New</Badge>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-[#999165] text-white">
        {route.label}
      </TooltipContent>
    </Tooltip>
  );
}

function SidebarContent({ routes, pathname }: { 
  routes: Route[];
  pathname: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4 border-b border-[#999165]/20">
        <h2 className="text-2xl font-semibold text-[#999165] px-4 flex items-center gap-2">
          <span className="bg-[#999165] text-[#fff300] px-2">Doc</span>
          <span className="bg-[#fff300] text-black px-2">Net</span>
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            {routes.map((route) => (
              <NavItem key={route.href} route={route} pathname={pathname} />
            ))}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-[#999165] text-[#999165] hover:bg-[#999165]/10"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Document
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#999165] text-white">
              Create a new document
            </TooltipContent>
          </Tooltip>

          <Separator className="bg-[#999165]/20" />

          <div>
            <h2 className="px-4 text-lg font-semibold text-[#999165] mb-4">
              Recent Documents
            </h2>
            <div className="space-y-1">
              {['Document 1', 'Meeting Notes', 'Project Plan'].map((doc, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal text-[#999165] hover:bg-[#999165]/10"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {doc}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#999165] text-white">
                    Open {doc}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}