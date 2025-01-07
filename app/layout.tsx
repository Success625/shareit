import type { Metadata } from "next";
import { Bokor, Geist, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: "400"
})

const bokor = Bokor({
  subsets: ['latin'],
  variable: "--font-bokor",
  weight: "400"
})

const geist = Geist({
  subsets: ['latin'],
  variable: "--font-geist",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Shareit",
  description: "The best app for sharing memories with loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bokor.variable} ${inter.variable} ${geist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
