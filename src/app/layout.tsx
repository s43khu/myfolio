import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AT",
  description:
    "Professional portfolio showcasing my skills, experience, and projects in web development, AI, and modern technologies.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "react",
    "next.js",
    "typescript",
    "ai",
    "web development",
  ],
  authors: [{ name: "Abhi" }],
  openGraph: {
    title: "AT - Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing my skills, experience, and projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
