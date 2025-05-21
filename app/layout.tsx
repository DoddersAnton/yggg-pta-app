import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Nav } from "@/components/nav/nav";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/components/providers/language-provider";
import Toaster from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YGGG PTA Website",
  description: "YGGG PTA Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <LanguageProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Nav/>
        <Toaster/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </LanguageProvider>
    </ClerkProvider>
  );
}
