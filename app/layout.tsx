"use client";

import "@/app/globals.css";
import { monospace700 } from "@/app/constants";
import Head from "next/head";

const metadata = {
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
