import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { History, Settings, MessageSquare } from "lucide-react";

export function CustomizationSidebar() {
  return (
    <div className="w-80 border-l bg-white">
      <Tabs defaultValue="history">
        <TabsList className="w-full">
          <TabsTrigger value="history" className="flex-1">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <TabsContent value="history" className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="version-1">
                <AccordionTrigger>Version 1.0</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-500">
                    Last edited by John Doe
                    <br />
                    2 hours ago
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    Restore Version
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="comments" className="p-4">
            <div className="space-y-4">
              <Input placeholder="Add a comment..." />
              {/* Comment threads would go here */}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Template Name</Label>
                <Input placeholder="Enter template name" />
              </div>
              <div>
                <Label>Access Permissions</Label>
                <Input placeholder="Set permissions" />
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
} 