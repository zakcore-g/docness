'use client'

import { useRecentActivities } from "@/hooks/useRecentActivities";
import { useUser } from "@clerk/nextjs";
import { Clock } from "lucide-react"

const ActivityLabel = () => {
    const { isSignedIn, user } = useUser();
    const userId = isSignedIn ? user?.id : null
    const { activities } = useRecentActivities(userId);
  return (
    <>
    <Clock className="h-4 w-4" />
    Recent Activity
    {activities?.length > 0 && (
      <span className="ml-auto text-xs bg-black/5 px-2 py-0.5 rounded-full">
        {activities.length}
      </span>
    )}
    </>
  )
}
export default ActivityLabel