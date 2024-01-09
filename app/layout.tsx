import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import ClockBackground from "./components/ClockBackground/ClockBackground";

export const metadata: Metadata = {
  title: "Seconds from GMT - a timezone calculator",
  description: "A more accurate timezone calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} inter-tnum`}>
        <MantineProvider>
          <ClockBackground />
          {children}
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
