import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { DocumentPerformance } from "@/components/analytics/DocumentPerformance";
import { UserEngagement } from "@/components/analytics/UserEngagement";
import { CustomReports } from "@/components/analytics/CustomReports";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <DateRangePicker />
      </div>

      <AnalyticsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentPerformance />
        <UserEngagement />
      </div>

      <CustomReports />
    </div>
  );
} 