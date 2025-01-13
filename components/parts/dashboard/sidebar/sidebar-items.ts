import { 
  LayoutDashboard, FileText, Users, FolderOpen, 
  Settings, UserCircle, Share2, Shield, History,
  Lock, HelpCircle, Trash, FolderKanban
} from "lucide-react"

// Separate dashboard item for header
export const dashboardItem = {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-black"
  }
  
  // Rest of the menu items
  export const menuItems = [
    {
      label: 'Projects',
      icon: FolderKanban,
      href: '/dashboard/projects',
      color: "text-black",
      subRoutes: [
        {
          label: 'Project 1',
          icon: FileText,
          href: '/dashboard/projects/1',
          color: "text-black"
        }
      ]
    },
    {
      label: 'Documents',
      icon: FileText,
      href: '/dashboard/documents',
      color: "text-black",
      subRoutes: [
        {
          label: 'Personal Documents',
          icon: UserCircle,
          href: '/dashboard/documents#personal',
          color: "text-black"
        },
        {
          label: 'Shared Documents',
          icon: Share2,
          href: '/dashboard/documents#shared',
          color: "text-black"
        }
      ]
    },
    {
      label: 'Collaboration',
      icon: Users,
      href: '/dashboard/collaboration',
      color: "text-black",
      subRoutes: [
        {
          label: 'Team Access',
          icon: Shield,
          href: '/dashboard/collaboration/team-access',
          color: "text-black"
        },
        {
          label: 'Version History',
          icon: History,
          href: '/dashboard/collaboration/history',
          color: "text-black"
        }
      ]
    },
    {
      label: 'Document Library',
      icon: FolderOpen,
      href: '/dashboard/library',
      color: "text-black",
      subRoutes: [
        {
          label: 'Templates',
          icon: FileText,
          href: '/dashboard/library/templates',
          color: "text-black"
        },
        {
          label: 'Access Control',
          icon: Lock,
          href: '/dashboard/library/access',
          color: "text-black"
        }
      ]
    },
  ]
  
  // Bottom menu items
  export const bottomMenuItems = [
    {
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: "text-black"
    },
    {
      label: 'Trash',
      icon: Trash,
      href: '/dashboard/trash',
      color: "text-black"
    },
    {
      label: 'Help',
      icon: HelpCircle,
      href: '/dashboard/help',
      color: "text-black"
    }
  ]