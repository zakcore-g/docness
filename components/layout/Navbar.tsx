"use client"

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileText, Users, BarChart, Book, Code, Play, FileCode, Boxes } from "lucide-react";

const sections = [
  {
    title: "Overview",
    href: "/overview",
  },
  {
    title: "Fundamentals",
    items: [
      { title: "Getting Started", href: "/fundamentals/getting-started" },
      { title: "Core Concepts", href: "/fundamentals/core-concepts" },
      { title: "Best Practices", href: "/fundamentals/best-practices" },
    ]
  },
  {
    title: "Build",
    items: [
      { title: "Templates", href: "/templates" },
      { title: "Components", href: "/components" },
      { title: "Integration", href: "/integration" },
    ]
  },
  {
    title: "Run",
    items: [
      { title: "Deployment", href: "/run/deployment" },
      { title: "Monitoring", href: "/run/monitoring" },
      { title: "Performance", href: "/run/performance" },
    ]
  },
  {
    title: "Reference",
    href: "/reference",
  },
  {
    title: "Samples",
    href: "/samples",
  }
];

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileCode className="h-6 w-6" />
          <span className="font-semibold text-lg">DocuFlow</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {sections.map((section) => (
              <NavigationMenuItem key={section.title}>
                {section.items ? (
                  <>
                    <NavigationMenuTrigger 
                      className={cn(
                        "bg-transparent hover:bg-gray-100",
                        pathname.startsWith('/' + section.title.toLowerCase()) && "text-blue-600"
                      )}
                    >
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[400px] p-4 md:w-[500px] lg:w-[600px] space-y-2">
                        {section.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={section.href} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-gray-100",
                        pathname === section.href && "text-blue-600"
                      )}
                    >
                      {section.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/console" 
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Go to console
        </Link>
        <UserButton 
          afterSignOutUrl="/login"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8"
            }
          }}
        />
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          href={href || "#"}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem"; 