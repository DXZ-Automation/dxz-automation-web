import type { Metadata } from "next";
import "./globals.css";
import { DXZChatWidget } from "@/components/DXZChatWidget";
import { ParticleNetworkBackground } from "@/components/ui/particle-network-bg";
import { validateEnvironment } from "@/lib/env-check";

// Validate required env vars at startup; surfaces misconfigurations in logs.
validateEnvironment();

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#030303] text-white">
        <ParticleNetworkBackground />
        {children}
        <DXZChatWidget />
      </body>
    </html>
  );
}
