import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { DXZChatWidget } from "@/components/DXZChatWidget";
import { validateEnvironment } from "@/lib/env-check";

// Validate required env vars at startup; surfaces misconfigurations in logs.
validateEnvironment();

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DXZ Automation — AI Revenue Recovery Systems",
  description:
    "We find the money you're already losing and automate getting it back. Revenue recovery systems for local service businesses. 7-day delivery. Measurable results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-white">
        {children}
        <DXZChatWidget />
      </body>
    </html>
  );
}
