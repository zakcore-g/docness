'use server'

import { adminDb } from "@/firebase-admin";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createNewDocument() {
    console.log("Starting document creation process...");
    
    const { userId, sessionClaims } = await auth();
    const user = await currentUser();
    console.log("Authentication completed with userId:", userId);
    
    if (!userId || !user) {
        console.error("User not authenticated");
        throw new Error("Not authenticated");
    }

    const email = sessionClaims?.email;
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    console.log("User details retrieved:", { email, fullName });
    
    if (!email) {
        console.error("Email is required but not found");
        throw new Error("Email is required");
    }

    try {
        console.log("Adding new document to 'documents' collection...");
        const docRef = await adminDb.collection("documents").add({
            title: "Untitled Document",
            createdAt: new Date(),
            createdBy: fullName,
            createdByEmail: email,
        });
        console.log("Document created with ID:", docRef.id);

        console.log("Setting up user room reference...");
        await adminDb.collection('users')
            .doc(email)
            .collection('rooms')
            .doc(docRef.id)
            .set({
                role: 'owner',
                createdAt: new Date(),
                title: "Untitled Document"
            });

        // Track the create activity
        await adminDb.collection('users')
            .doc(email)
            .collection('activities')
            .add({
                title: "Untitled Document",
                action: "Created by you",
                timestamp: new Date(),
                documentId: docRef.id,
                userId: userId,
                type: 'create'
            });

        console.log("Document and activity setup completed");

        return { docId: docRef.id };
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
}