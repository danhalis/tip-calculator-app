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
        {/* Google Space Mono font family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={monospace700.className}>{children}</body>
    </html>
  );
}
