"use client"; // https://nextjs.org/docs/getting-started/react-essentials#client-components

import React from "react";
import { Card, CardContent } from "@mui/material";
import AmountInput from "@/components/AmountInput";
import TipSelectionButton from "@/components/TipSelectionButton";
import ResultPanel from "@/components/ResultPanel";

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
        h-[40vh] w-[80vw]"
      >
        <CardContent className="w-full flex p-6">
          <Card
            className="
            flex-1
          "
            style={{ border: "none", boxShadow: "none" }}
          >
            <CardContent>
              <AmountInput
                id="bill"
                label="Bill"
                icon="/icon-dollar.svg"
                iconWidth={11.6}
                iconHeight={18}
              />
              <h2>Select Tip %</h2>
              <div className="grid grid-cols-3">
                <TipSelectionButton>5%</TipSelectionButton>
                <TipSelectionButton>10%</TipSelectionButton>
                <TipSelectionButton>15%</TipSelectionButton>
                <TipSelectionButton>25%</TipSelectionButton>
                <TipSelectionButton>50%</TipSelectionButton>
                <TipSelectionButton>Custom</TipSelectionButton>
              </div>
              <AmountInput
                id="people-num"
                label="Number of People"
                icon="/icon-person.svg"
                iconWidth={14.6}
                iconHeight={18}
              />
            </CardContent>
          </Card>
          <ResultPanel className="flex-1" />
        </CardContent>
      </Card>
    </div>
  );
}
