"use client"; // https://nextjs.org/docs/getting-started/react-essentials#client-components

import React from "react";
import { Card, CardContent } from "@mui/material";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";

export default function Home() {
  return (
    <div
      className="
      h-screen
      flex flex-col
      items-center justify-center
      space-y-2
    "
    >
      <h1>SPLITTER</h1>
      <Card
        className="
        flex
        rounded-3xl
        w-[100vh]
        "
      >
        <CardContent className="w-full flex p-6">
          <InputPanel className="flex-1 pr-6" />
          <OutputPanel className="flex-1" />
        </CardContent>
      </Card>
    </div>
  );
}
