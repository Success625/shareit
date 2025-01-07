import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fascinate_Inline, Geist, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: "400",
});

const facinate_inline = Fascinate_Inline({
  subsets: ["latin"],
  variable: "--facinate-inline",
  weight: "400",
});

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
        className={`${poppins.variable} ${geist.variable} ${facinate_inline.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
