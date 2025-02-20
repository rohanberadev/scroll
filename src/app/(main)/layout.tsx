import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/navbar/BottomNav";
import SideNav from "@/components/navbar/SideNav";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

function MainApp({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex w-full flex-col items-center lg:flex-1 lg:pl-[250px] xl:pl-[325px]">
      {children}
    </main>
  );
}

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth().catch(() => redirect("/sign-in"));
  const username = session?.user.name;
  if (!username) {
    redirect("/sign-in");
  }

  return (
    <div className="flex w-full max-lg:flex-col lg:flex-row">
      {/* Header for Mobile */}
      <AppHeader />

      {/* Desktop Nav */}
      <SideNav username={username} />

      {/* <main className="flex w-full flex-col items-center lg:flex-1 lg:pl-[250px] xl:pl-[325px]">
        {children}
      </main> */}

      <MainApp>{children}</MainApp>

      {/* Mobile Nav */}
      <BottomNav username={username} />
    </div>
  );
}
