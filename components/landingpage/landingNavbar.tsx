import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NavDropdown = ({ trigger, items }: { trigger: string; items: string[] }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-[#999165] hover:text-[#999165]/80 cursor-pointer font-medium">
          {trigger}
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-56 p-0 bg-white/95 backdrop-blur-sm border border-[#999165]/20" 
        sideOffset={8}
      >
        <div className="flex flex-col">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2.5 text-sm text-[#999165] hover:bg-[#999165]/10 cursor-pointer transition-colors duration-200"
            >
              {item}
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Navbar = () => {
  const menuItems = {
    Features: ["Pre-Built Templates", "AI Generation", "Real-Time Collaboration", "Document Analytics"],
    Pricing: ["Free Plan", "Pro Plan", "Enterprise"],
    About: ["Our Story", "Team", "Careers"],
    Contact: ["Support", "Sales", "Partnership"]
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-row justify-between items-center h-16 px-6 bg-[#fdf9ec]/95 backdrop-blur-sm border-b border-[#999165]/10">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-semibold">
            <span className="bg-[#999165] text-[#fff300] px-2">DoC</span>
            <span className="bg-[#fff300] text-black px-2">net</span>
          </div>
        </Link>

        <div className="flex gap-6">
          {Object.entries(menuItems).map(([trigger, items]) => (
            <NavDropdown key={trigger} trigger={trigger} items={items} />
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInButton>
            <Button 
              variant="outline" 
              className="text-[#999165] border-[#999165] hover:bg-[#999165]/10 font-medium"
            >
              Login
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button 
              className="bg-[#fff300] text-black hover:bg-[#fff300]/90 font-medium"
            >
              Sign up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="text-[#999165] border-[#999165] hover:bg-[#999165]/10 mr-4 font-medium"
            >
              Dashboard
            </Button>
          </Link>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-white/95 backdrop-blur-sm border border-[#999165]/20",
                userButtonPopoverActionButton: "text-[#999165] hover:bg-[#999165]/10",
              }
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;