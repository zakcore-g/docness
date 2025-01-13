'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function DeleteButton({ userEmail, docId }: { userEmail: string; docId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch('/api/documents/delete', {
        method: 'DELETE',
        body: JSON.stringify({ userEmail, docId }),
      });
    } catch (error) {
      console.error('Failed to delete:', error);
    }
    setIsDeleting(false);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="ghost"
      size="icon"
      className="hidden group-hover:flex hover:bg-red-100 hover:text-red-700 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
} 