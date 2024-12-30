import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/john.jpg",
    },
    action: "edited",
    document: "Project Proposal",
    time: "2 hours ago",
    status: "completed",
  },
  // Add more activities...
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback>
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activity.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.document}</TableCell>
                <TableCell>{activity.time}</TableCell>
                <TableCell>
                  <Badge variant="outline">{activity.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 