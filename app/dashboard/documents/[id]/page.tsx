import { currentUser } from "@clerk/nextjs/server";
import DocumentEditor from "./components/DocumentEditor";


// This will be the server component (page.tsx)
export default async function Document({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!userEmail) {
    return null;
  }

  return <DocumentEditor id={params.id} userEmail={userEmail} />;
}