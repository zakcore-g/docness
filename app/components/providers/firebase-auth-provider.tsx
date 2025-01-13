'use client';

import { auth, signInWithCustomToken } from '@/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let unsubscribe: () => void;

    const initializeAuth = async () => {
      try {
        // Set up auth state listener
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            // If no user, try to get a new token
            const response = await fetch('/api/get-firebase-token');
            if (!response.ok) {
              throw new Error('Failed to get Firebase token');
            }
            
            const { token } = await response.json();
            await signInWithCustomToken(auth, token);
          }
        });

        // Initial auth attempt
        const response = await fetch('/api/get-firebase-token');
        if (!response.ok) {
          throw new Error('Failed to get Firebase token');
        }
        
        const { token } = await response.json();
        await signInWithCustomToken(auth, token);
      } catch (error) {
        console.error('Error initializing Firebase auth:', error);
      }
    };

    initializeAuth();

    // Cleanup auth state listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return <>{children}</>;
}
