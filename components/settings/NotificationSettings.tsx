import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="comments">Comments and Mentions</Label>
              <Switch id="comments" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="shares">Document Shares</Label>
              <Switch id="shares" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="updates">Template Updates</Label>
              <Switch id="updates" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">In-App Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="activity">Activity Feed</Label>
              <Switch id="activity" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="collaboration">Collaboration Requests</Label>
              <Switch id="collaboration" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 