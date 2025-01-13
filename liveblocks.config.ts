import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Verify environment variable
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {
  cursor: { x: number; y: number } | null;
};

type Storage = {
  // Add your storage fields here
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};

export type { Presence, Storage, UserMeta };

export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useThreads,
  useCreateThread,
  useEditThreadMetadata,
  useCreateComment,
  useEditComment,
  useDeleteComment,
  useRoom,
} = createRoomContext<Presence, Storage, UserMeta>(client);

export { client };
