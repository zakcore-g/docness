import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Clock, MessageSquare } from "lucide-react";

const stats = [
  {
    title: "Active Collaborators",
    value: "24",
    icon: Users,
    trend: "+12%",
  },
  {
    title: "Shared Documents",
    value: "156",
    icon: FileText,
    trend: "+25%",
  },
  {
    title: "Avg. Response Time",
    value: "2.4h",
    icon: Clock,
    trend: "-18%",
  },
  {
    title: "Comments",
    value: "482",
    icon: MessageSquare,
    trend: "+32%",
  },
];

export function CollaborationStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 