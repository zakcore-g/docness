"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Trash2, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DocCardProps {
  id: string;
  href: string;
  onDelete?: () => void;
}

const DocCard = ({ id, href, onDelete }: DocCardProps) => {
  const [data, loading] = useDocumentData(
    doc(db, "documents", id)
  );

  if (loading || !data) return null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDoc(doc(db, "documents", id));
        onDelete?.();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const formattedDate = new Date(data.createdAt?.toDate()).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                {data.title || "Untitled Document"}
              </CardTitle>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex-1 truncate">
              <span className="text-gray-600 dark:text-gray-300">{data.createdBy}</span>
              {data.createdBy !== data.createdByEmail && (
                <span className="text-xs text-gray-400 ml-1">({data.createdByEmail})</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DocCard;