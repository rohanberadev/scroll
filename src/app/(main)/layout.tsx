import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/navbar/BottomNav";
import SideNav from "@/components/navbar/SideNav";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full max-lg:flex-col lg:flex-row">
      {/* Header for Mobile */}
      <AppHeader />

      {/* Desktop Nav */}
      <SideNav />

      <main className="flex w-full flex-col items-center lg:flex-1 lg:px-8 lg:pl-[250px] xl:pl-[325px]">
        {children}
      </main>

      {/* Main Screen */}
      {/* <main className="scrollbar flex h-screen flex-col items-center overflow-y-scroll max-lg:h-tab-screen max-lg:w-full max-xs:h-mobile-screen lg:h-screen lg:flex-1 lg:px-8">
        {children}
      </main> */}

      {/* Mobile Nav */}
      <BottomNav />
    </div>
  );
}
