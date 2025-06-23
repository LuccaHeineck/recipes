// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import AddRecipeModal from '../components/AddRecipeModal';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Recipes",
  description: "Add and view your recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="flex justify-between items-center">
          <Link href="/">
            <h1
            className="cursor-pointer sm:text-2xl font-bold"
            style={{ fontSize: "2.5rem", marginLeft: "12px" }} // mobile style
          >
            My recipes
          </h1>
          </Link>
          <div className="flex gap-4 mr-4">
            <AddRecipeModal />
            <ThemeToggle />
          </div>
        </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
