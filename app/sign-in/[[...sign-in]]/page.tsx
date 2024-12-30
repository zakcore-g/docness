import { SignIn } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none p-0",
              headerTitle: "text-2xl font-bold text-center",
              headerSubtitle: "text-center text-gray-600",
              socialButtonsBlockButton: "w-full",
              formButtonPrimary: 
                "bg-[#ffe800] text-black hover:bg-[#9b9165] hover:text-white",
              footerActionLink: "text-[#9b9165] hover:text-[#1f1b0c]",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </Card>
    </div>
  );
} 