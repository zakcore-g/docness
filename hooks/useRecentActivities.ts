import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, where} from "firebase/firestore";
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
    const timestamp = data.timestamp?.toDate() || new Date();

    // Format the activity title based on type
    const activityTitles: Record<string, string> = {
      create: 'Created Document',
      edit: 'Updated Document',
      delete: 'Deleted Document',
      share: 'Shared Document',
      comment: 'Commented on Document'
    };

    // Format the activity action based on type
    const activityActions: Record<string, string> = {
      create: 'Created a new document',
      edit: 'Made changes to',
      delete: 'Removed',
      share: 'Shared',
      comment: 'Commented on'
    };

    return {
      id: doc.id,
      title: activityTitles[data.type] || 'Document Activity',
      action: `${activityActions[data.type]} ${data.documentTitle || 'Untitled Document'}`,
      timestamp: formatDistanceToNow(timestamp, { addSuffix: true }),
      documentId: data.documentId,
      documentTitle: data.documentTitle || 'Untitled Document',
      documentUrl: `/dashboard/documents/${data.documentId}`
    };
  }) || [];

  return {
    activities: formattedActivities,
    loading,
    error
  };
};
