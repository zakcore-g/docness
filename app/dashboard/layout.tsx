import DashboardNavbar from "@/components/parts/dashboard/navbar";
import DashboardSidebar from "@/components/parts/dashboard/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: 
    { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-[#faf7ff]">
        <DashboardNavbar className="sticky top-0 z-50 bg-white"/>
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}