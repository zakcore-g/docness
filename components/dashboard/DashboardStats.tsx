import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Star, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Documents",
    value: "234",
    icon: FileText,
    trend: "+12.5%",
  },
  {
    title: "Active Templates",
    value: "45",
    icon: Star,
    trend: "+5.2%",
  },
  {
    title: "Collaborators",
    value: "12",
    icon: Users,
    trend: "+2.1%",
  },
  {
    title: "Time Saved",
    value: "128h",
    icon: Clock,
    trend: "+25.8%",
  },
];

export function DashboardStats() {
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