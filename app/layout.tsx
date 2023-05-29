"use client";

import "@/app/globals.css";
import { monospace700 } from "@/app/constants";

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
      <body className={monospace700.className}>{children}</body>
    </html>
  );
}
