import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan", value: 400 },
  { date: "Feb", value: 300 },
  { date: "Mar", value: 600 },
  { date: "Apr", value: 800 },
  { date: "May", value: 500 },
  { date: "Jun", value: 700 },
];

export function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Engagement</CardTitle>
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
                dataKey="value" 
                stroke="#ffe800" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 