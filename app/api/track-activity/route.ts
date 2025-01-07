import { NextResponse } from "next/server";
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

type ActivityType = 'create' | 'edit' | 'delete' | 'share' | 'comment';

export async function POST(req: Request) {
    try {
        console.log("Track activity: Starting request");
        const session = await auth();
        const userId = session?.userId;
        if (!userId) {
            console.error("Track activity: No userId found in session");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { userEmail, documentId, documentTitle, activityType }: {
            userEmail: string;
            documentId: string;
            documentTitle: string;
            activityType: ActivityType;
        } = await req.json();

        console.log("Track activity: Received request", {
            userEmail,
            documentId,
            documentTitle,
            activityType,
            userId
        });

        if (!userEmail || !documentId || !documentTitle || !activityType) {
            const missingFields = [];
            if (!userEmail) missingFields.push('userEmail');
            if (!documentId) missingFields.push('documentId');
            if (!documentTitle) missingFields.push('documentTitle');
            if (!activityType) missingFields.push('activityType');
            
            console.error("Track activity: Missing fields:", missingFields);
            return new NextResponse(`Missing required fields: ${missingFields.join(', ')}`, { status: 400 });
        }

        const activityText = {
            create: 'Created',
            edit: 'Edited',
            delete: 'Deleted',
            share: 'Shared',
            comment: 'Commented on'
        };

        const activityData = {
            title: documentTitle,
            action: `${activityText[activityType]} by you`,
            timestamp: new Date(),
            documentId,
            userId,
            type: activityType
        };

        console.log("Track activity: Adding activity to Firestore", {
            collection: 'activities',
            data: activityData
        });

        const docRef = await adminDb.collection('activities')
            .add(activityData);

        console.log("Track activity: Successfully added activity with ID:", docRef.id);
        return new NextResponse("Activity tracked successfully", { status: 200 });
    } catch (error) {
        console.error('Error tracking activity:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
    }
}
