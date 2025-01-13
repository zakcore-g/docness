"use client";

import { LiveblocksProvider } from "@liveblocks/react";
import { ReactNode } from "react";
import { client } from "@/liveblocks.config";

export function Providers({ children }: { children: ReactNode }) {
  return (
      <LiveblocksProvider client={client}>
        {children}
      </LiveblocksProvider>
  );
}
