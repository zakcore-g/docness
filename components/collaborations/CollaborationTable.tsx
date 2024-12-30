import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Users } from "lucide-react";

const collaborations = [
  {
    id: 1,
    document: "Business Proposal",
    collaborators: [
      { name: "John Doe", avatar: "/avatars/john.jpg" },
      { name: "Jane Smith", avatar: "/avatars/jane.jpg" },
    ],
    lastEdited: "2 hours ago",
    status: "Active",
  },
  // Add more collaborations...
];

export function CollaborationTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Collaborations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Collaborators</TableHead>
              <TableHead>Last Edited</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collaborations.map((collab) => (
              <TableRow key={collab.id}>
                <TableCell>{collab.document}</TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {collab.collaborators.map((user, i) => (
                      <Avatar key={i} className="border-2 border-white">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{collab.lastEdited}</TableCell>
                <TableCell>
                  <Badge variant="outline">{collab.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Manage Access</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 