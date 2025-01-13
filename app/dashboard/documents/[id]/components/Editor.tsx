"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  liveblocksConfig,
  LiveblocksPlugin,
} from "@liveblocks/react-lexical";
import { Toolbar } from "./Toolbar";
import { Threads } from "./Threads";


export function Editor() {
  const initialConfig = liveblocksConfig({
    namespace: "DocNet",
    onError: (error: unknown) => {
      console.error(error);
      throw error;
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <div className="editor-container border rounded-lg shadow-sm">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Start typing here...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <LiveblocksPlugin>
            <Threads />
          </LiveblocksPlugin>
        </div>
      </LexicalComposer>
    </div>
  );
} 