import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-lexical/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import FirebaseAuthProvider from './components/providers/firebase-auth-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'DocNet',
  description: 'Document Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <FirebaseAuthProvider>
          <body className={inter.className}>
            {children}
          </body>
        </FirebaseAuthProvider>
      </ClerkProvider>
    </html>
  );
}
