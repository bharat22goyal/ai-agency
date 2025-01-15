import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automatrix - AI-Powered Testing Solutions",
  description: "Transform your business with our cutting-edge AI agents and automation solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#030014] min-h-screen">
        {/* Background Effects Container - Fixed to cover entire viewport */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0 bg-grid opacity-25" />
          
          {/* Glow */}
          <div className="absolute inset-0 bg-glow opacity-30" />
          
          {/* Moving Lines */}
          <div className="absolute inset-0 cyber-lines opacity-20" />
        </div>

        {/* Content Container - Allows scrolling while background stays fixed */}
        <div className="relative z-0 flex flex-col min-h-screen">
          <Navigation />
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
