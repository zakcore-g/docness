import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react"


const ShareButton = ({ userEmail, docId }: { userEmail: string; docId: string }) => {
    const handleShare = async () => {
        try {
          await fetch('/api/documents/share', {
            method: 'POST',
            body: JSON.stringify({ userEmail, docId }),
          });
        } catch (error) {
          console.error('Failed to share:', error);
        }
      };
  return (
    <Button
        onClick={handleShare}
        variant="ghost"
        size="icon"
        className="hidden group-hover:flex hover:bg-blue-100"
        >
        <Share2 className="h-4 w-4" />
        </Button>
  )
}
export default ShareButton