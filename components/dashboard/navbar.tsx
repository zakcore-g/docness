"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Search, ChevronRight, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DashboardNavbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const breadcrumbs = pathname.split('/').filter(Boolean);

  return (
    <TooltipProvider>
      <div className={cn(
        "h-14 px-4 border-b border-[#999165]/20 bg-[#fdf9ec]",
        className
      )}>
        <div className="h-full flex items-center justify-between">
          {/* Left Section: Breadcrumbs */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 text-sm text-[#999165]">
              <Link 
                href="/dashboard" 
                className="hover:text-[#999165]/80 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              >
                <Home className="h-4 w-4" />
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb} className="flex items-center">
                  <ChevronRight className="h-4 w-4 mx-0.5 text-[#999165]/50" />
                  <Link 
                    href={`/${breadcrumbs.slice(0, index + 1).join('/')}`}
                    className={cn(
                      "hover:text-[#999165]/80 capitalize px-2 py-1 rounded-md transition-colors",
                      index === breadcrumbs.length - 1 && "font-medium"
                    )}
                  >
                    {crumb.replace(/-/g, ' ')}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Compact Search */}
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999165]/50" />
              <Input 
                placeholder="Search..." 
                className="h-8 pl-8 pr-4 bg-white/50 border-[#999165]/20 focus:border-[#999165] focus:ring-[#999165] text-[#999165] placeholder:text-[#999165]/40 text-sm"
              />
            </div>

            {/* Actions */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative w-8 h-8 hover:bg-[#999165]/10 rounded-lg"
                >
                  <Bell className="h-4 w-4 text-[#999165]" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#fff300]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            <div className="ml-2">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonPopoverCard: "bg-white/95 backdrop-blur-sm border border-[#999165]/20",
                    userButtonPopoverActionButton: "text-[#999165] hover:bg-[#999165]/10",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
