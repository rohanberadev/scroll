import Navbar from "@/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex w-full flex-row">
      <Navbar />
      <div className="flex min-h-screen flex-1 flex-col items-center px-6 pt-2">
        {children}
      </div>
      <footer className="border-l-[1px] border-gray-400 lg:w-[250px] xl:w-[350px]"></footer>
    </main>
  );
}
