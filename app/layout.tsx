import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "datveez",
  description: "Normalize your data visually",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
