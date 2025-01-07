import { auth } from "@clerk/nextjs/server";

export default async function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();
  const userEmail = sessionClaims?.email as string;

  return (
    <div data-user-email={userEmail}>
      {children}
    </div>
  );
}
