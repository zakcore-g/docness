import { adminDb } from '@/firebase-admin';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

interface ShareDocumentRequest {
  documentId: string;
  targetUserEmail: string;
  role: 'viewer' | 'editor';
}

export async function POST(request: Request) {
  try {
    // Verify the current user is authenticated
    const session = await auth();
    if (!session?.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { documentId, targetUserEmail, role }: ShareDocumentRequest = await request.json();

    // Get the document reference to copy metadata
    const docSnapshot = await adminDb
      .collection('documents')
      .doc(documentId)
      .get();

    if (!docSnapshot.exists) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const documentData = docSnapshot.data();

    // Add document reference to target user's documents collection
    await adminDb
      .collection('users')
      .doc(targetUserEmail)
      .collection('documents')
      .doc(documentId)
      .set({
        role: role,
        createdAt: documentData?.createdAt || new Date().toISOString(),
        updatedAt: documentData?.updatedAt || new Date().toISOString(),
        title: documentData?.title || 'Untitled Document'
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to share document:', error);
    return NextResponse.json({ error: 'Failed to share document' }, { status: 500 });
  }
}
