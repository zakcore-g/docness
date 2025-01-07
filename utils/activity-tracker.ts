import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type ActivityType = 'create' | 'edit' | 'delete' | 'share' | 'comment';

interface TrackActivityParams {
  userEmail: string;
  documentId: string;
  documentTitle: string;
  activityType: ActivityType;
  userId: string;
}

export const trackActivity = async ({
  userEmail,
  documentId,
  documentTitle,
  activityType,
  userId,
}: TrackActivityParams) => {
  if (!userEmail) return;

  try {
    const response = await fetch('/api/track-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        documentId,
        documentTitle,
        activityType,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to track activity: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};
