'use client'

import { FormEvent, useEffect, useState, use } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";

export default function Document({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [input, setInput] = useState("");
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Get user email from the data attribute set in layout
    const userEmailFromDOM = document.querySelector('[data-user-email]')?.getAttribute('data-user-email') || '';
    setUserEmail(userEmailFromDOM);
  }, []);

  useEffect(() => {
    if (data) {
      setInput(data.title || "");
    }
  }, [data]);

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userEmail) return;

    try {
      // First update the document
      await updateDoc(docRef, { 
        title: input,
        updatedAt: new Date()
      });

      // Then track the activity using server action
      const response = await fetch('/api/track-activity', {
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to track activity: ${errorText}`);
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!userEmail) return <div>Please sign in to edit documents</div>;

  return (
    <div className="space-y-8">
      <form onSubmit={updateTitle} className="flex items-center gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Document Title"
          className="flex-grow"
        />
        <Button type="submit" className="bg-black hover:bg-black/90 text-white">Update Title</Button>
      </form>
    </div>
  );
}