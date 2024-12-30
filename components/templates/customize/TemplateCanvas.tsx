import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TemplateCanvas() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 rounded-lg">
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto p-8">
          <Card className="bg-white p-8 min-h-[1000px]">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <div className="prose max-w-none">
                <h1 contentEditable>Document Title</h1>
                <p contentEditable>
                  Start editing your document here. Click on any text to modify it.
                </p>
              </div>
            )}
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
} 