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
      <main className="no-scrollbar h-app-screen flex flex-col items-center overflow-y-scroll max-lg:w-full max-lg:pb-12 lg:h-screen lg:flex-1 lg:px-8 lg:pt-12">
        {children}
      </main>

      {/* Mobile Nav */}
      <BottomNav />
    </div>
  );
}
