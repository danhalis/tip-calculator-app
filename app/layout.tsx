"use client";

import "./globals.css";
import { monospace700 } from "./constants";
import Head from "next/head";

export const metadata = {
  title: "Splitter",
  description: "Tip calculator based on a bill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={monospace700.className}>{children}</body>
    </html>
  );
}
