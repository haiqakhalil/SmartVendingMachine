import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vend-O-Buddy",
  description: "Smart Vending Machine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}