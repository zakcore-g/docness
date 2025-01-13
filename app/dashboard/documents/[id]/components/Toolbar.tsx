"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OPEN_FLOATING_COMPOSER_COMMAND } from "@liveblocks/react-lexical";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(OPEN_FLOATING_COMPOSER_COMMAND, undefined)
        }
      >
        <MessageSquarePlus className="h-4 w-4 mr-2" />
        Add comment
      </Button>
    </div>
  );
} 