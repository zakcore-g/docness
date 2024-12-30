import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan", views: 400, completions: 240 },
  { date: "Feb", views: 300, completions: 139 },
  { date: "Mar", views: 600, completions: 380 },
  { date: "Apr", views: 800, completions: 500 },
  { date: "May", views: 500, completions: 350 },
  { date: "Jun", views: 700, completions: 450 },
];

export function AnalyticsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#ffe800" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="completions" 
                stroke="#9b9165" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 