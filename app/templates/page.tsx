import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Templates</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      <TemplateFilters />
      <TemplateGrid />
    </div>
  );
} 