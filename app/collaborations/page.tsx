import { CollaborationActivity } from "@/components/collaborations/CollaborationActivity";
import { CollaborationTable } from "@/components/collaborations/CollaborationTable";
import { CollaborationStats } from "@/components/collaborations/CollaborationStats";


export default function CollaborationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Collaborations</h1>
      
      <CollaborationStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CollaborationTable />
        </div>
        <div>
          <CollaborationActivity />
        </div>
      </div>
    </div>
  );
} 