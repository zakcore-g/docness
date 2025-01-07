import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, where, Timestamp } from "firebase/firestore";

export interface RecentActivity {
  id: string;
  title: string;
  action: string;
  timestamp: Date;
  userId: string;
  documentId: string;
  type: string;
}

export const useRecentActivities = (userId: string | null, limitCount: number = 5) => {
  console.log('[useRecentActivities] Called with:', { userId, limitCount });
  
  const [activities, loading, error] = useCollection(
    userId
      ? query(
          collection(db, 'activities'),
          where('userId', '==', userId),
          orderBy('timestamp', 'desc'),
          limit(limitCount)
        )
      : null
  );

  console.log('[useRecentActivities] Query result:', {
    hasActivities: Boolean(activities?.docs?.length),
    loading,
    error: error?.message
  });

  const formattedActivities = activities?.docs.map(doc => {
    const data = doc.data();
    const timestamp = data.timestamp;
    return {
      id: doc.id,
      title: data.title,
      action: data.action,
      timestamp: timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp),
      userId: data.userId,
      documentId: data.documentId,
      type: data.type
    } as RecentActivity;
  }) || [];

  return {
    activities: formattedActivities,
    loading,
    error
  };
};
