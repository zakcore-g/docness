import DocCard from "@/components/parts/dashboard/documents/DocCard"
import { currentUser } from "@clerk/nextjs/server"
import { FileText } from "lucide-react"
import { getUserDocuments, getSharedDocuments } from '@/app/lib/documents'


export const dynamic = 'force-dynamic'

const DocumentPage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return <ErrorState message="Please sign in to view documents." />;
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!userEmail) {
    return <ErrorState message="User email not found" />;
  }

  try {
    // Fetch documents directly
    const personalDocs = await getUserDocuments(userEmail);
    const sharedDocs = await getSharedDocuments(userEmail);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <DocumentSection
            title="Personal Documents"
            documents={personalDocs}
            userEmail={userEmail}
          />

          <DocumentSection
            title="Shared Documents"
            documents={sharedDocs}
            userEmail={userEmail}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading documents:", error);
    return <ErrorState message={`Error loading documents: ${error instanceof Error ? error.message : 'Unknown error'}`} />;
  }
}

const DocumentSection = ({ 
  title, 
  documents, 
  userEmail
}: { 
  title: string; 
  documents: Array<{
    id: string;
    title: string;
    createdAt: string;
    role?: string;
    access?: Record<string, string>;
  }>;
  userEmail: string;
}) => {
  if (!documents.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <div className="text-center p-8 bg-white dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="mx-auto w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700/30 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">No documents found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <DocCard
            key={doc.id}
            id={doc.id}
            href={`/dashboard/documents/${doc.id}`}
            userEmail={userEmail}
            title={doc.title}
            createdAt={doc.createdAt}
            role={doc.role}
            access={doc.access}
          />
        ))}
      </div>
    </div>
  );
}

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="text-red-500 mb-2">
        <FileText className="w-12 h-12" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-center">{message}</p>
    </div>
  );
}

export default DocumentPage;