import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const documents = [
  {
    name: "Business Proposal",
    views: 1234,
    completionRate: 85,
    avgTime: "5m 30s",
  },
  {
    name: "Legal Contract",
    views: 892,
    completionRate: 92,
    avgTime: "8m 15s",
  },
  // Add more documents...
];

export function DocumentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Avg. Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.name}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.views}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={doc.completionRate} className="w-[60px]" />
                    <span className="text-sm">{doc.completionRate}%</span>
                  </div>
                </TableCell>
                <TableCell>{doc.avgTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 