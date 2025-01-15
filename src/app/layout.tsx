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
      <body className={`${inter.className} min-h-screen bg-[#030014]`}>
        <div className="fixed inset-0 z-0">
          <div className="bg-grid absolute inset-0" />
          <div className="bg-glow absolute inset-0" />
          <div className="bg-aurora absolute inset-0" />
          <div className="cyber-lines absolute inset-0" />
        </div>
        <div className="relative z-10">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
