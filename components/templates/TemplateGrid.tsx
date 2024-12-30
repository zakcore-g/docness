import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Copy, Share2 } from "lucide-react";

const templates = [
  {
    id: 1,
    title: "Legal Contract",
    description: "Standard legal contract template with customizable clauses",
    category: "Legal Documents",
    lastModified: "2 days ago",
    usageCount: 128,
  },
  // Add more templates...
];

export function TemplateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{template.title}</CardTitle>
              <Badge>{template.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{template.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>Last modified: {template.lastModified}</span>
              <span className="mx-2">•</span>
              <span>Used {template.usageCount} times</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 