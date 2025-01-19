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
      <main className="scrollbar max-xs:h-mobile-screen max-lg:h-tab-screen flex h-screen flex-col items-center overflow-y-scroll max-lg:w-full lg:h-screen lg:flex-1 lg:px-8 lg:pt-12">
        {children}
      </main>

      {/* Mobile Nav */}
      <BottomNav />
    </div>
  );
}
