import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SharedLayout from "@/components/shared-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Embedded Accounts Getting Started",
  description: "Embedded Accounts Quickstart Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
