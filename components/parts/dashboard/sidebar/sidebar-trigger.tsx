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
      className={`h-8 w-8 hover:bg-[#faf7ff] rounded-lg ${className}`}
      onClick={toggleSidebar}
    >
      {state === "expanded" ? (
        <ChevronsLeft className="h-4 w-4 text-black" />
      ) : (
        <ChevronsRight className="h-4 w-4 text-black" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
} 