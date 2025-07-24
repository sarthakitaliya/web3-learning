import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Privy Wallet",
  description: "A simple wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body
          className={`bg-[#F5F5F4] text-[#1F1F1F] dark:bg-[#202020] dark:text-white ${inter.className} overflow-x-hidden `}
        >
          <Navbar />
          {children}
          <Footer/>
        </body>
      </ThemeProvider>
    </html>
  );
}
