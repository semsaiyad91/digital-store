
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminLayout from "@/app/components/AdminLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockPro | Inventory Manager",
  description: "Manage your shop inventory easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#090914] antialiased">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
