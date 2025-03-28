import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Scroll",
  description: "Scroll App is a social media platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="relative min-h-screen w-full overflow-y-scroll bg-black text-gray-200 max-lg:pb-12">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
