import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/Footer";
import BackToTopButton from "@/components/ui/BackToTopButton";

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
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-dental-md pt-20 pb-dental-lg">
            {children}
          </main>
          <Footer />
          <BackToTopButton />
        </Providers>
      </body>
    </html>
  );
}
