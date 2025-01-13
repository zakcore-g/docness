import { Button } from "@/components/ui/button"
import { FolderPlus } from "lucide-react"

const NewProjectButton = () => {
  return (
    <Button 
    className="w-full justify-start gap-2 bg-black text-white hover:bg-black/90"
  >
    <FolderPlus className="h-4 w-4" />
    New Project
  </Button>
  )
}
export default NewProjectButton