import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"; // ✅ Import sonner

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskBoard – Beautiful Project Management SaaS",
  description:
    "Organize your team’s work in style. A stunning modern SaaS alternative to Monday.com.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-950 text-gray-100 antialiased">
        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Main Content */}
        <main className="pt-[96px] min-h-screen max-w-7xl mx-auto px-4 pb-12">
          {children}
        </main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Sonner Toast Container */}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
