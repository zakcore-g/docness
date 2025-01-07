import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

// This interface defines the structure for a RecentActivity object
// which represents a single activity with its metadata.
export interface RecentActivity {
  // Optional unique identifier for the activity.
  id?: string;

  // Title or name of the activity (e.g., "Updated Document")
  title: string;

  // Description of the action taken, e.g., 'Edited by John Doe'.
  action: string;

  // A timestamp indicating when the activity occurred, formatted as a string.
  timestamp: string;

  // Document related information
  documentId: string;
  documentTitle: string;
  documentUrl: string;
}

export const useRecentActivities = (userId: string | null, limitCount: number = 6) => {
  // Use the useCollection hook to get the relevant activities from Firestore.
  // The query is conditionally created based on whether or not a userId was provided.
  // If a userId was provided, the query will only return activities for that user.
  // If no userId was provided, the query is null and won't run.
  const [activities, loading, error] = useCollection(
    userId
      ? query(
          // Create a query for the Firestore collection 'activities'.
          collection(db, 'activities'),
          
          // If a userId was provided, filter the results to only include activities for that user.
          where('userId', '==', userId),
          
          // Sort the results by the 'timestamp' field in descending order (newest first).
          orderBy('timestamp', 'desc'),
          
          // Limit the number of results to the provided limitCount.
          limit(limitCount)
        )
      : null
  );

  // Create an array of formatted activities from the query results.
  const formattedActivities = activities?.docs?.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: `${data.type.charAt(0).toUpperCase() + data.type.slice(1)} Document`,
      action: data.action || 'Updated',
      timestamp: formatDistanceToNow(new Date(data.timestamp.seconds * 1000), { addSuffix: true }),
      documentId: data.documentId,
      documentTitle: data.title || 'Untitled Document',
      documentUrl: `/dashboard/documents/${data.documentId}`
    };
  }) || [];

  return {
    activities: formattedActivities,
    loading,
    error
  };
};
