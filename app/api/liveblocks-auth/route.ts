import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user from Clerk
  const user = await currentUser();
  
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Create a session for the current user
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo: {
        name: user.firstName ?? "Anonymous",
        email: user.emailAddresses[0]?.emailAddress,
        image: user.imageUrl,
      },
    }
  );

  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Return the session
  const { status, body } = await session.authorize();
  return new Response(body, { status });
} 