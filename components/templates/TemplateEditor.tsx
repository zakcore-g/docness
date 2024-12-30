import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateEditor({ open, onOpenChange }: TemplateEditorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="edit" className="flex-1">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(80vh-8rem)] mt-4">
            <TabsContent value="edit" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter template title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter template content..."
                  className="min-h-[400px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              {/* Preview content will go here */}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Select category" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permissions">Access Permissions</Label>
                <Input id="permissions" placeholder="Set permissions" />
              </div>
            </TabsContent>
          </ScrollArea>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 