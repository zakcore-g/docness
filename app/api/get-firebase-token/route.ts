import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminAuth } from "@/firebase-admin";

/**
 * Handles the GET request to obtain a Firebase token for the authenticated user.
 * 
 * @returns {Promise<NextResponse>} - JSON response containing the Firebase token.
 */
export async function GET(): Promise<NextResponse> {
    try {
        console.log("Attempting to get Clerk auth...");
        const { userId }: { userId: string | null } = await auth();
        console.log("Got userId from Clerk:", userId);

        if (!userId) {
            console.log("No userId found");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("Creating Firebase custom token...");
        const token: string = await adminAuth.createCustomToken(userId);
        console.log("Created Firebase token for user:", userId);
        
        return NextResponse.json({ token });
    } catch (error) {
        console.error("Error in get-firebase-token route:", error);
        return new NextResponse(
            error instanceof Error ? error.message : "Internal Server Error", 
            { status: 500 }
        );
    }
}
