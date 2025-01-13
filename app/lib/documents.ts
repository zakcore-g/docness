import { cache } from 'react'
import 'server-only'
import { adminDb } from '@/firebase-admin'

interface DocumentData {
  title: string;
  createdAt: string;
  role?: string;
  access?: Record<string, string>;
}

export const getUserDocuments = cache(async (userEmail: string) => {
  try {
    const snapshot = await adminDb
      .collection('users')
      .doc(userEmail)
      .collection('documents')
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title || 'Untitled Document',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        role: data.role,
        access: data.access
      }
    })
  } catch (error) {
    console.error('Error fetching user documents:', error)
    return []
  }
})

export const getSharedDocuments = cache(async (userEmail: string) => {
  try {
    const snapshot = await adminDb
      .collection('documents')
      .where(`access.${userEmail}`, 'in', ['viewer', 'editor'])
      .get()

    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title || 'Untitled Document',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        role: data.role,
        access: data.access
      }
    })
  } catch (error) {
    console.error('Error fetching shared documents:', error)
    return []
  }
})

export const checkDocumentAccess = async (userEmail: string, documentId: string) => {
  const userDocRef = adminDb
    .collection('users')
    .doc(userEmail)
    .collection('documents')
    .doc(documentId);
  
  const docSnapshot = await userDocRef.get();
  if (!docSnapshot.exists) {
    throw new Error('Document access not found');
  }
  
  return docSnapshot.data();
}

export const shareDocument = async (documentId: string, targetUserEmail: string, role: 'viewer' | 'editor') => {
  const response = await fetch('/api/documents/share', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      documentId,
      targetUserEmail,
      role,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to share document');
  }

  return response.json();
}