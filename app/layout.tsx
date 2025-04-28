import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Njoku Obinna | Web Design, Graphic Design & Video Editing Portfolio",
  description: "Professional portfolio showcasing web design, graphic design, and video editing services. Creative digital solutions for your business.",
  keywords: ["web design", "graphic design", "video editing", "portfolio", "UI/UX design", "brand identity", "digital solutions"],
  authors: [{ name: "Njoku Obinna" }],
  creator: "Njoku Obinna",
  publisher: "Njoku Obinna",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
