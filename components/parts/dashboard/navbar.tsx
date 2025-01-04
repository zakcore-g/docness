"use client"

import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, Search } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HoverSidebar } from "./hoverSidebar"

const DashboardNavbar = ({className}: {className?: string}) => {


  return (
    <TooltipProvider>
      <div className={cn(
        "h-14 px-4 border-b border-[#999165]/20 bg-[#fdf9ec]",
        className
      )}>
        <div className="h-full flex items-center justify-between">
          {/* Left Section: HoverSidebar & breadcrumbs */}
          <div className="flex items-center gap-2">
            <HoverSidebar />
            {/* Breadcrumbs */}
            
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
  )
}
export default DashboardNavbar