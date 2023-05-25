"use client"

import React from "react";
import { Card, TextField, Button } from "@mui/material"
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
          <h2>Bill</h2>
          <TextField
            id="bill"
            placeholder="0"
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
          <h2>Number of People</h2>
          <TextField
            id="people-num"
            placeholder="0"
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
