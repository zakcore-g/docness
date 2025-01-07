import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminAuth } from "@/firebase-admin";

export async function GET() {
    try {
        console.log("Attempting to get Clerk auth...");
        const { userId } = await auth();
        console.log("Got userId from Clerk:", userId);

        if (!userId) {
            console.log("No userId found");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("Creating Firebase custom token...");
        const token = await adminAuth.createCustomToken(userId);
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
