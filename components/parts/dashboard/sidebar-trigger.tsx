"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

export function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 hover:bg-[#999165]/10 rounded-lg ${className}`}
      onClick={toggleSidebar}
    >
      {state === "expanded" ? (
        <ChevronsLeft className="h-4 w-4 text-[#999165]" />
      ) : (
        <ChevronsRight className="h-4 w-4 text-[#999165]" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
} 