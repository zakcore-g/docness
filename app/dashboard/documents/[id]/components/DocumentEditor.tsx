'use client'

import { FormEvent, useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { Room } from "../components/Room";
import { Editor } from "../components/Editor";
import { useThreads, useOthers, useMyPresence } from "@liveblocks/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DocumentEditorProps {
  id: string;
  userEmail: string;
}

function DocumentEditorContent({ id, userEmail }: DocumentEditorProps) {
  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const { threads } = useThreads();
  const others = useOthers();
  const [myPresence, updateMyPresence] = useMyPresence();

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      updateMyPresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, [updateMyPresence]);

  // Set initial input value when data loads
  if (data?.title && !input) {
    setInput(data.title);
  }

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsUpdating(true);
      const timestamp = new Date().toISOString();
      
      await updateDoc(docRef, {
        title: input,
        updatedAt: timestamp
      });

      await fetch('/api/track-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          documentId: id,
          documentTitle: input,
          activityType: 'edit'
        }),
      });
    } catch (err) {
      console.error("Error updating document:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading document: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Active Users */}
      <div className="fixed top-4 right-4 flex -space-x-2">
        {others.map(({ connectionId, info }) => (
          <Avatar key={connectionId} className="border-2 border-white">
            <AvatarImage src={typeof info?.image === 'string' ? info.image : undefined} alt={typeof info?.name === 'string' ? info.name : undefined} />
            <AvatarFallback>{typeof info?.name === 'string' ? info.name[0]?.toUpperCase() : ''}</AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Cursors */}
      {others.map(({ connectionId, presence, info }) => {
        if (!presence?.cursor || typeof presence.cursor !== 'object' || !('x' in presence.cursor) || !('y' in presence.cursor)) return null;
        
        return (
          <div
            key={connectionId}
            className="fixed pointer-events-none"
            style={{
              left: presence.cursor.x,
              top: presence.cursor.y,
            }}
          >
            <div className="relative">
              <svg
                className="w-4 h-4 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.64,16.36a9,9,0,1,1,12.72,0l-6.36-6.36Z" />
              </svg>
              <div className="absolute left-4 top-0 px-2 py-1 bg-black text-white text-sm rounded whitespace-nowrap">
                {typeof info?.name === 'string' ? info.name : ''}
              </div>
            </div>
          </div>
        );
      })}

      <div className="space-y-8">
        <form onSubmit={updateTitle} className="flex items-center gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Document Title"
            className="flex-grow"
          />
          <Button 
            type="submit" 
            className="bg-black hover:bg-black/90 text-white" 
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
        <Editor />
      </div>
    </div>
  );
}

export default function DocumentEditor({ id, userEmail }: DocumentEditorProps) {
  return (
    <Room id={id}>
      <DocumentEditorContent id={id} userEmail={userEmail} />
    </Room>
  );
}