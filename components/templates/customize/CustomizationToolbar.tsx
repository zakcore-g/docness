import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon, 
  Table, 
  List 
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CustomizationToolbar() {
  return (
    <div className="fixed left-16 top-20 bg-white border rounded-lg shadow-sm p-2">
      <div className="flex flex-col gap-4">
        <Menubar className="flex flex-col">
          <MenubarMenu>
            <MenubarTrigger className="p-2">
              <Bold className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Regular</MenubarItem>
              <MenubarItem>Medium</MenubarItem>
              <MenubarItem>Bold</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Separator orientation="horizontal" />

        <ToggleGroup orientation="vertical" type="single">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="horizontal" />

        <div className="flex flex-col gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ImageIcon className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Table className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 