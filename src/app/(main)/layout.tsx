import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/navbar/BottomNav";
import SideNav from "@/components/navbar/SideNav";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full flex-col lg:flex lg:flex-row">
      {/* Header for Mobile */}
      <AppHeader />

      {/* Desktop Nav */}
      <SideNav />

      {/* Main Screen */}
      <main className="no-scrollbar flex h-screen flex-col items-center overflow-y-scroll max-lg:w-full lg:flex-1">
        {children}
      </main>

      {/* Footer for Desktop */}
      <AppFooter />

      {/* Mobile Nav */}
      <BottomNav />
    </div>
  );
}
