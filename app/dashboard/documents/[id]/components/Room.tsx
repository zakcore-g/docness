"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({ children, id }: { children: ReactNode; id: string }) {
  const roomId = `document-${id}`;

  return (
    <RoomProvider id={roomId} initialPresence={() => ({})}>
      <ClientSideSuspense fallback={<div>Loading editor...</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
