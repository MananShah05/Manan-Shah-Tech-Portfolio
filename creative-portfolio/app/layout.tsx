import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { resumeData } from "@/lib/resume-data";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/layout/CustomCursor";

const displayFont = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${resumeData.personal.name} — Portfolio`,
  description: `${resumeData.personal.name} — B.Tech IT student at DJSCE Mumbai. Building at the edge of NLP × Finance × AI.`,
  keywords: ["portfolio", "resume", "data science", "nlp", "machine learning"],
  openGraph: {
    type: "profile",
    title: `${resumeData.personal.name} — Portfolio`,
    description: `${resumeData.personal.name} — B.Tech IT student at DJSCE Mumbai. Building at the edge of NLP × Finance × AI.`,
  },
  authors: [{ name: resumeData.personal.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
      >
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
