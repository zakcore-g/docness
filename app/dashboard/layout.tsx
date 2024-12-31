import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#fdf9ec]">
      {/* Desktop Sidebar - Fixed position */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar className="border-r border-[#999165]/20" playlists={[]} />
      </div>
      
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar className="w-full" playlists={[]} />
      </div>

      {/* Main Content */}
      <div className="md:pl-72">
        {/* Navbar */}
        <DashboardNavbar className="sticky top-0 z-50" />
        
        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}