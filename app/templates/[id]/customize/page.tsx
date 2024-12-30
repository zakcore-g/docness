"use client"

import { TemplateCanvas } from "@/components/templates/customize/TemplateCanvas";
import { CustomizationToolbar } from "@/components/templates/customize/CustomizationToolbar";
import { CustomizationSidebar } from "@/components/templates/customize/CustomizationSidebar";
import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";

export default function TemplateCustomizePage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customize Template</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100%-3rem)]">
        <CustomizationToolbar />
        <TemplateCanvas />
        <CustomizationSidebar />
      </div>
    </div>
  );
} 