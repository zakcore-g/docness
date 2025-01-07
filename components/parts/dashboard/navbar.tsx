"use client"

import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, Search } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HoverSidebar } from "./sidebar/hoverSidebar"

const DashboardNavbar = ({className}: {className?: string}) => {
  return (
    <TooltipProvider>
      <div className={cn(
        "h-14 px-4 border-b border-black/10 bg-white",
        className
      )}>
        <div className="h-full flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <HoverSidebar />
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" />
              <Input 
                placeholder="Search..." 
                className="h-8 pl-8 pr-4 bg-[#faf7ff] border-black/10 focus:border-black focus:ring-black text-black placeholder:text-black/40 text-sm"
              />
            </div>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative w-8 h-8 hover:bg-[#faf7ff] rounded-lg"
                >
                  <Bell className="h-4 w-4 text-black" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-black" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* User Button */}
            <div className="ml-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonPopoverCard: "bg-white/95 backdrop-blur-sm border border-black/10",
                    userButtonPopoverActionButton: "text-black hover:bg-[#faf7ff]",
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