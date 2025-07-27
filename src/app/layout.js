"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-dental-md pt-20 pb-dental-lg">
            {" "}
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
