"use client" // https://nextjs.org/docs/getting-started/react-essentials#client-components

import React from "react";
import { Card, Button } from "@mui/material";
import AmountInput from "@/components/AmountInput";
import TipSelectionButton from "@/components/TipSelectionButton";

export default function Home() {
  return (
    <div className="
      h-screen
      flex flex-col
      items-center justify-center
      space-y-2
    ">
      <h1>SPLITTER</h1>
      <Card
        className="
          flex
          h-[40vh] w-[80vw]
        "
      >
        <div
          className="
            flex-1
          "
        >
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
        </div>
        <Card
          className="
            flex-1
            bg-[#00494d]
          "
        >
          <div>
            <h2>Tip Amount / person</h2>
            <h2>$0.00</h2>
          </div>
          <div>
            <h2>Total / person</h2>
            <h2>$0.00</h2>
          </div>
          <Button
            variant="contained"
            className="
              bg-[#26c0ab]
              text-[#00494d]
            "
          >
            RESET
          </Button>
        </Card>
      </Card>
    </div>
  );
}
