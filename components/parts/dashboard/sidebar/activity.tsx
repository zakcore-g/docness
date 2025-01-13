'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useRecentActivities } from "@/hooks/useRecentActivities";
import { useUser } from "@clerk/nextjs";
import { Clock } from "lucide-react"

const Activity = ({ height }: { height: string }) => {
    const { isSignedIn, user } = useUser();
    const userId = isSignedIn ? user?.id : null
    const { activities, loading, error } = useRecentActivities(userId);
  return (
    <ScrollArea className={height}>
              {loading ? (
                <div className="flex items-center justify-center h-20 text-sm text-black/70">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Loading activities...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-20 text-sm text-red-500 p-4">
                  <div className="flex flex-col items-center gap-2">
                    <span>Error loading activities</span>
                    <span className="text-xs text-red-400">{error.message}</span>
                  </div>
                </div>
              ) : !activities || activities.length === 0 ? (
                <div className="flex items-center justify-center h-20 text-sm text-black/70">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="h-4 w-4 opacity-50" />
                    <span>No recent activities</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {activities.map((activity, i) => (
                    <div key={activity.id || i} className="relative group">
                      <a 
                        href={activity.documentUrl}
                        className="block rounded-md transition-all duration-200 hover:bg-[#faf7ff] hover:shadow-sm"
                      >
                        <div className="p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium leading-none group-hover:text-black transition-colors">
                              {activity.title}
                            </h4>
                            <span className="text-xs text-black/50 whitespace-nowrap ml-2">
                              {activity.timestamp}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-black/80">
                              {activity.documentTitle}
                            </p>
                            <p className="text-xs text-black/60">
                              {activity.action}
                            </p>
                          </div>
                        </div>
                      </a>
                      {i < activities.length - 1 && (
                        <div className="absolute bottom-0 left-3 right-3 h-px bg-black/5" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
  )
}
export default Activity