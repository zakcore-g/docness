import DashboardNavbar from "@/components/parts/dashboard/navbar";
import DashboardSidebar from "@/components/parts/dashboard/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: 
    { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-[#fdf9ec]">
        <DashboardNavbar className="sticky top-0 z-50"/>
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}