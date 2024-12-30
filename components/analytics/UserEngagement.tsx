import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const sections = [
  { name: "Introduction", timeSpent: 120, interactions: 45 },
  { name: "Executive Summary", timeSpent: 180, interactions: 65 },
  { name: "Project Scope", timeSpent: 240, interactions: 80 },
  // Add more sections...
];

export function UserEngagement() {
  const maxTimeSpent = Math.max(...sections.map(s => s.timeSpent));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {sections.map((section) => (
              <HoverCard key={section.name}>
                <HoverCardTrigger asChild>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{section.name}</span>
                      <span>{Math.round(section.timeSpent / 60)}m</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#ffe800]" 
                        style={{ 
                          width: `${(section.timeSpent / maxTimeSpent) * 100}%` 
                        }} 
                      />
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Time spent: {Math.round(section.timeSpent / 60)} minutes</p>
                    <p className="text-sm">Interactions: {section.interactions}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 