"use client"; // https://nextjs.org/docs/getting-started/react-essentials#client-components

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@mui/material";
import InputPanel, { Input } from "@/components/input/InputPanel";
import OutputPanel from "@/components/OutputPanel";

export default function Home() {
  const [input, setInput] = useState<Input>({
    bill: 0,
    tipPercentage: 0,
    people: 0,
  });
  const onInputChanged = (input: Input) => {
    setInput(input);
  };

  const [resetSignal, setResetSignal] = useState<boolean>(false);

  return (
    <div
      className="
      h-screen
      flex flex-col
      items-center justify-center
      space-y-20
    "
    >
      <Image src="/logo.svg" alt="SPLITTER App Logo" width={70} height={70} />
      <Card
        className="
        flex
        rounded-3xl
        w-[100vh]
        "
      >
        <CardContent className="w-full flex px-6 py-5">
          <InputPanel
            className="flex-1 pr-6"
            resetSignal={resetSignal}
            onInputChanged={onInputChanged}
            onResetSignalReceived={() => {
              // Turn off reset signal for downstream
              setResetSignal(false);
            }}
          />
          <OutputPanel
            className="flex-1"
            input={input}
            onResetButtonClicked={() => {
              // Turn on reset signal for downstream
              setResetSignal(true);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
