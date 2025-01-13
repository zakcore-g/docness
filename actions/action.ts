'use server'

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

/**
 * Creates a new document in the "documents" collection, and sets up a user room
 * reference with the correct permissions.
 * @param {string} email - The email address of the user creating the document.
 * @param {string} fullName - The full name of the user creating the document.
 * @returns {Promise<{docId: string}>} - The ID of the document created.
 */
export async function createNewDocument(email: string, fullName: string): Promise<{ docId: string }> {
    console.log("Starting document creation process...");
    
    const { userId } = await auth();
    console.log("Authentication completed with userId:", userId);
    
    if (!userId) {
        console.error("User not authenticated");
        throw new Error("Not authenticated");
    }

    console.log("User details retrieved:", { email, fullName });
    
    if (!email) {
        console.error("Email not found in session claims");
        throw new Error("Email not found");
    }

    try {
        // Create a new document with default content
        console.log("Creating new document with data:", {
            title: 'Untitled Document',
            userId,
            email,
            fullName
        });

        const docRef = await adminDb.collection('documents').add({
            title: 'Untitled Document',
            content: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: {
                userId,
                email,
                name: fullName
            }
        });

        console.log("Document created with ID:", docRef.id);

        // Create user-document reference
        await adminDb.collection('users')
            .doc(email)
            .collection('documents')
            .doc(docRef.id)
            .set({
                role: 'owner',
                createdAt: new Date(),
                title: 'Untitled Document'
            });

        console.log("User-document reference created");

        // Track the document creation activity
        console.log("Tracking document creation activity");
        
        const activityData = {
            userId,
            userEmail: email,
            documentId: docRef.id,
            documentTitle: 'Untitled Document',
            activityType: 'create',
            timestamp: new Date()
        };

        // Add activity directly to Firestore instead of using API route
        await adminDb.collection('activities').add(activityData);
        
        console.log("Activity tracked successfully");
        console.log("Document creation process completed successfully");

        return { docId: docRef.id };
    } catch (error) {
        console.error("Error creating document:", error);
        // Log the full error details
        if (error instanceof Error) {
            console.error({
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } else {
            console.error("Unknown error type:", error);
        }
        throw error; // Throw the original error to preserve the stack trace
    }
}