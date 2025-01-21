import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/navbar/BottomNav";
import SideNav from "@/components/navbar/SideNav";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <main className="scrollbar flex h-screen flex-col items-center overflow-y-scroll max-lg:h-tab-screen max-lg:w-full max-xs:h-mobile-screen lg:h-screen lg:flex-1 lg:px-8">
        {children}
      </main>

      {/* Mobile Nav */}
      <BottomNav />
    </div>
  );
}
