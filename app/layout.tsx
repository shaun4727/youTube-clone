import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--Inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Youtube Clone",
  description: "Youtube Clone Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
