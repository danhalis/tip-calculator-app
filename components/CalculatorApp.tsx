"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@mui/material";
import InputPanel, { Input } from "@/components/input/InputPanel";
import OutputPanel from "@/components/OutputPanel";

function CalculatorApp() {
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
      h-auto
      w-full
      flex flex-col
      items-center justify-center
      space-y-10
      mt-10
      mb-5
      lg:space-y-20
      lg:h-screen
      lg:mt-0
      lg:mb-0
    "
    >
      <Image src="/logo.svg" alt="SPLITTER App Logo" width={70} height={70} />
      <Card
        className="
        h-auto
        max-w-[30rem]
        flex
        mx-2
        rounded-3xl
        shadow-[0_25px_50px_5px_rgba(170,210,220,1)]
        lg:w-[100vh]
        lg:max-w-[100vh]
        lg:h-auto
        2xl:max-w-[900px]
        "
      >
        <CardContent
          className="
          h-auto
          w-full 
          flex flex-col
          lg:flex-row
          lg:px-6 lg:py-5
        "
        >
          <InputPanel
            className="mt-[-0.1rem] lg:mt-0 lg:mb-[-0.5rem] lg:flex-1 lg:pr-6"
            resetSignal={resetSignal}
            onInputChanged={onInputChanged}
            onResetSignalReceived={() => {
              // Turn off reset signal for downstream
              setResetSignal(false);
            }}
          />
          <OutputPanel
            className="mx-1 lg:flex-1"
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

export default CalculatorApp;
