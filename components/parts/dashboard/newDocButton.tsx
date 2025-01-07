"use client"

import { Button } from "@/components/ui/button"
import { createNewDocument } from "@/actions/action"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { useState } from "react"

const NewDocButton = () => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateDocument = async () => {
    try {
      setIsCreating(true)
      console.log("Creating new document...")
      const { docId } = await createNewDocument()
      console.log("Document created with ID:", docId)
      router.push(`/dashboard/documents/${docId}`)
      router.refresh()
    } catch (error) {
      console.error("Error creating document:", error)
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