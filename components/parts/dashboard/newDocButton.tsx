"use client"

import { Button } from "@/components/ui/button"
import { createNewDocument } from "@/actions/action"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"

const NewDocButton = () => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const { user } = useUser()
  const { toast } = useToast()

  const handleCreateDocument = async () => {
    try {
      if (!user?.emailAddresses?.[0]?.emailAddress) {
        throw new Error("Email is required")
      }
      
      setIsCreating(true)
      console.log("Creating new document...")
      const { docId } = await createNewDocument(
        user.emailAddresses[0].emailAddress,
        user.fullName || 'Anonymous User'
      )
      console.log("Document created with ID:", docId)
      router.push(`/dashboard/documents/${docId}`)
      router.refresh()
    } catch (error) {
      console.error("Error creating document:", error)
      toast({
        title: "Error creating document",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Button
      onClick={handleCreateDocument}
      disabled={isCreating}
      variant="outline" 
      className="w-full justify-start gap-2 border-black text-black hover:bg-[#faf7ff]"
    >
      <Plus className="h-4 w-4" />
      {isCreating ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocButton