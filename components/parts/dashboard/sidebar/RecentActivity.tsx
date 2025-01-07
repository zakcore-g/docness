"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { auth, signInWithCustomToken } from "@/firebase"
import { useRecentActivities } from "@/hooks/useRecentActivities"
import { formatDistanceToNow } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Clock } from "lucide-react"

interface RecentActivityProps {
  limit?: number;
  className?: string;
  showTitle?: boolean;
}

export function RecentActivity({ limit = 5, className = "", showTitle = true }: RecentActivityProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = isSignedIn ? user?.id : null;
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const { activities, loading, error } = useRecentActivities(isFirebaseReady ? userId : null, limit);

  // Debug logs for auth state
  useEffect(() => {
    console.log('[RecentActivity] Auth State:', {
      isLoaded,
      isSignedIn,
      userId,
      isFirebaseReady,
      firebaseError,
      hasActivities: activities?.length > 0,
      loading,
      error: error?.message
    });
  }, [isLoaded, isSignedIn, userId, isFirebaseReady, firebaseError, activities, loading, error]);

  useEffect(() => {
    const setupFirebase = async () => {
      console.log('[RecentActivity] Setting up Firebase...', { isSignedIn, userId });
      
      if (!isSignedIn || !userId) {
        console.log('[RecentActivity] Not signed in or no userId, skipping Firebase setup');
        setIsFirebaseReady(false);
        return;
      }

      try {
        console.log('[RecentActivity] Fetching Firebase token...');
        const response = await fetch('/api/get-firebase-token');
        console.log('[RecentActivity] Token response status:', response.status);
        
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to get Firebase token: ${response.status} - ${text}`);
        }
        
        const data = await response.json();
        console.log('[RecentActivity] Got Firebase token:', { hasToken: !!data.token });
        
        console.log('[RecentActivity] Signing in to Firebase...');
        await signInWithCustomToken(auth, data.token);
        console.log('[RecentActivity] Successfully signed in to Firebase');
        
        setIsFirebaseReady(true);
        setFirebaseError(null);
      } catch (err) {
        console.error('[RecentActivity] Firebase setup error:', err);
        setFirebaseError(err instanceof Error ? err.message : 'Failed to authenticate with Firebase');
        setIsFirebaseReady(false);
      }
    };

    setupFirebase();
  }, [isSignedIn, userId]);

  return (
    <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-primary">
            <Clock className="h-4 w-4" />
            Recent Activity
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[200px] w-full rounded-md">
              <div className="px-1">
                
              </div>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>

  );
}

export default RecentActivity;