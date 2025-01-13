"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Clock } from "lucide-react";
import DocumentOptions from "./DocumentOptions";

interface DocCardProps {
  id: string;
  href: string;
  userEmail: string;
  title: string;
  createdAt: string;
  role?: string;
  access?: Record<string, string>;
}

const DocCard = ({ id, href, userEmail, title, createdAt, role, access }: DocCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const userRole = role || access?.[userEmail] || 'viewer';

  return (
    <Card className="group hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <Link href={href}>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {title || "Untitled Document"}
              </CardTitle>
            </Link>
          </div>
          <DocumentOptions userEmail={userEmail} docId={id} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
          <div className="flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-700/30 rounded-full">
            <Clock className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700/30 rounded-full capitalize">
            {userRole}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocCard;