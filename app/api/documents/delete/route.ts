import { adminDb } from '@/firebase-admin';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { userEmail, docId } = await request.json();
  
  try {
    await adminDb
      .collection('users')
      .doc(userEmail)
      .collection('rooms')
      .doc(docId)
      .delete();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
} 