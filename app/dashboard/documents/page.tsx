'use client'

import { useCollection } from "react-firebase-hooks/firestore"
import { db, auth } from "@/firebase"
import { collection, query, where, orderBy, deleteDoc, doc, getDoc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { signInWithCustomToken } from "firebase/auth"
import DocCard from "@/components/parts/dashboard/documents/DocCard"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { trackActivity } from "@/utils/activity-tracker"

const DocumentPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const setupFirebase = async () => {
      if (!isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) {
        setIsFirebaseReady(false);
        return;
      }

      try {
        console.log("Fetching Firebase token...");
        const response = await fetch('/api/get-firebase-token');
        
        if (!response.ok) {
          throw new Error(`Failed to get Firebase token: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.token) {
          throw new Error("No token received from server");
        }

        console.log("Signing in to Firebase...");
        await signInWithCustomToken(auth, data.token);
        console.log("Firebase sign in successful");
        
        setIsFirebaseReady(true);
        setAuthError(null);
      } catch (error) {
        console.error("Firebase setup error:", error);
        setAuthError(error instanceof Error ? error.message : 'Unknown error occurred');
        setIsFirebaseReady(false);
      }
    };

    setupFirebase();
  }, [isSignedIn, user]);

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  
  const [userRooms, roomsLoading, roomsError] = useCollection(
    isSignedIn && isFirebaseReady && userEmail
      ? query(
          collection(db, 'users', userEmail, 'rooms'),
          where('role', '==', 'owner'),
          orderBy('createdAt', 'desc')
        )
      : null
  );

  const [sharedRooms, sharedLoading, sharedError] = useCollection(
    isSignedIn && isFirebaseReady && userEmail
      ? query(
          collection(db, 'users', userEmail, 'rooms'),
          where('role', '!=', 'owner'),
          orderBy('createdAt', 'desc')
        )
      : null
  );

  const handleDelete = async (userEmail: string, docId: string) => {
    try {
      const docRef = doc(db, 'users', userEmail, 'rooms', docId);
      const docSnapshot = await getDoc(docRef);
      const docData = docSnapshot.data();
      
      // Delete the room reference
      await deleteDoc(docRef);

      // Track the delete activity
      if (docData && user?.id) {
        await trackActivity({
          userEmail,
          documentId: docId,
          documentTitle: docData.title || 'Untitled Document',
          activityType: 'delete',
          userId: user.id
        });
      }
    } catch (error) {
      console.error("Error deleting room reference:", error);
    }
  };

  if (!isLoaded) return <LoadingState message="Loading authentication..." />;
  if (!isSignedIn) return <ErrorState message="Please sign in to view documents." />;
  if (authError) return <ErrorState message={`Authentication error: ${authError}`} />;
  if (!isFirebaseReady) return <LoadingState message="Setting up Firebase authentication..." />;
  if (roomsLoading || sharedLoading) return <LoadingState message="Loading documents..." />;
  if (roomsError || sharedError) {
    console.error("Error loading documents:", roomsError || sharedError);
    return <ErrorState message={`Error loading documents: ${(roomsError || sharedError)?.message}`} />;
  }

  if (!userEmail) {
    return <ErrorState message="User email not found" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <DocumentSection
          title="Personal Documents"
          documents={userRooms?.docs || []}
          userEmail={userEmail}
          onDelete={handleDelete}
        />

        <DocumentSection
          title="Shared Documents"
          documents={sharedRooms?.docs || []}
          userEmail={userEmail}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

const DocumentSection = ({ 
  title, 
  documents, 
  userEmail,
  onDelete 
}: { 
  title: string; 
  documents: QueryDocumentSnapshot<DocumentData>[];
  userEmail: string;
  onDelete: (userEmail: string, docId: string) => Promise<void>;
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{title}</h2>
    {documents.length === 0 ? (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No documents found</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <DocCard 
            key={doc.id} 
            id={doc.id} 
            href={`/dashboard/documents/${doc.id}`}
            onDelete={() => onDelete(userEmail, doc.id)}
          />
        ))}
      </div>
    )}
  </div>
);

const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="flex items-center space-x-2 text-gray-500">
      <Loader2 className="h-5 w-5 animate-spin" />
      <p>{message}</p>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-[300px]">
    <p className="text-red-500">{message}</p>
  </div>
);

export default DocumentPage;