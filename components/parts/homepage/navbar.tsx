// Import necessary UI components and dependencies
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Logo from '@/components/common/Logo'
import Link from "next/link"
import { SignInButton, SignedIn, UserButton, SignedOut } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

// Type definition for menu items
type MenuItem = {
  name: string;  // Display name of the menu item
  href: string;  // URL path for the menu item
}

// Navigation menu structure with nested routes
const menuItems = {
  Features: [
    { name: "Pre-Built Templates", href: "/features/templates" },
    { name: "AI Generation", href: "/features/ai-generation" },
    { name: "Real-Time Collaboration", href: "/features/collaboration" },
    { name: "Document Analytics", href: "/features/analytics" }
  ],
  Pricing: [
    { name: "Free Plan", href: "/pricing/free" },
    { name: "Pro Plan", href: "/pricing/pro" },
    { name: "Enterprise", href: "/pricing/enterprise" }
  ],
  About: [
    { name: "Our Story", href: "/about/story" },
    { name: "Team", href: "/about/team" },
    { name: "Careers", href: "/about/careers" }
  ],
  Contact: [
    { name: "Support", href: "/contact/support" },
    { name: "Sales", href: "/contact/sales" },
    { name: "Partnership", href: "/contact/partnership" }
  ]
} as const

// Common styles used throughout the navbar
const styles = {
  menuItem: "text-[#999165] hover:bg-[#999165]/10 px-4 py-2.5 text-sm",
  button: "bg-orange-400 hover:bg-orange-300",
  container: "bg-white/95 backdrop-blur-sm border border-[#999165]/20"
}

const LoginButton = ({ className = "" }) => (
  <div>
    <SignedOut>
      <SignInButton mode="modal">
        <Button variant="ghost" className={`${className} ${styles.button}`}>
          Login
        </Button>
      </SignInButton>
    </SignedOut>
  </div>
);

/**
 * A component that renders a link to the dashboard when the user is signed in.
 *
 * @param className - The class name to apply to the link element.
 * @returns The link to the dashboard.
 */
const DashboardLink = ({ className = "" }: { className?: string }) => (
  <SignedIn>
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-2 font-medium bg-orange-400 hover:bg-orange-300 border border-orange-400",
        className
      )}
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
      Dashboard
    </Link>
  </SignedIn>
);

// Dropdown menu component for desktop navigation
const NavDropdown = ({ trigger, items }: { trigger: string; items: MenuItem[] }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <div className="text-[#999165] hover:text-[#999165]/80 cursor-pointer font-medium">
        {trigger}
      </div>
    </HoverCardTrigger>
    <HoverCardContent className={`w-56 p-0 ${styles.container}`} sideOffset={8}>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <Link key={i} href={item.href} className={`${styles.menuItem} transition-colors duration-200`}>
            {item.name}
          </Link>
        ))}
      </div>
    </HoverCardContent>
  </HoverCard>
)

// Mobile sidebar component that appears on smaller screens
const MobileSidebar = () => (
  <>
  <Sheet>
    <SheetTrigger asChild>
      <MenuIcon className="h-6 w-6 text-[#999165] hover:text-[#999165]/80 md:hidden" />
    </SheetTrigger>
    <SheetContent side="right" className="w-72 bg-white p-0">
      <header className="flex items-center justify-between p-4">
        <Logo />
      </header>
      <nav className="flex flex-col gap-4 p-4">
        {/* Map through menu items to create mobile dropdown menus */}
        {Object.entries(menuItems).map(([trigger, items]) => (
          <DropdownMenu key={trigger}>
            <DropdownMenuTrigger className={`w-full text-left ${styles.menuItem}`}>
              {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56 ${styles.container}`} side="bottom" align="start">
              {items.map((item, i) => (
                <Link href={item.href} key={i}>
                  <DropdownMenuItem className={styles.menuItem}>{item.name}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>
      <LoginButton className="w-full px-4 py-2.5" />
      <DashboardLink className="w-full px-4 py-2.5" />
    </SheetContent>
  </Sheet>
  </>
  
)

// Main navbar component that combines all the above components
const HomeNavbar = () => (
  <nav className="w-full border-b shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <Logo />
      {/* Desktop navigation menu - hidden on mobile */}
      <div className="md:flex hidden gap-6">
        {Object.entries(menuItems).map(([trigger, items]) => (
          <NavDropdown key={trigger} trigger={trigger} items={items as unknown as MenuItem[]} />
        ))}
      </div>
      {/* Right side of navbar with auth buttons and mobile menu */}
      <div className="flex items-center gap-4">
        <LoginButton className="hidden md:flex" />
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "h-8 w-8 md:h-10 md:w-10" }}} />
        </SignedIn>
        <DashboardLink className="hidden md:flex" />
        <MobileSidebar />
      </div>
    </div>
  </nav>
)

export default HomeNavbar