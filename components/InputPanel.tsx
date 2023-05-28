import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import AmountInput from "./AmountInput";
import TipSelectionRadioButtonGroup from "./TipSelectionRadioButtonGroup";

export interface Input {
  bill: number;
  tipPercentage: number;
  people: number;
}
interface Props {
  className: string;
  onInputChanged: ({
    bill,
    tipPercentage,
    people,
  }: Input) => void;
}

function InputPanel({ className, onInputChanged }: Props) {
  const [bill, setBill] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<string>("");

  const parseStringVal = (stringVal: string) => stringVal == "" ? 0 : parseFloat(stringVal);

  return (
    <Card
      className={`${className}`}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardContent>
        <AmountInput
          value={bill}
          ariaLabel="bill"
          label="Bill"
          icon="/icon-dollar.svg"
          iconWidth={11.6}
          iconHeight={18}
          margin="dense"
          tailwindHeight="h-11"
          onValueChange={(value) => {
            const zero = value == "0";
            if (zero && bill == "") return;

            setBill(value);
            onInputChanged({
              bill: parseStringVal(value),
              tipPercentage: parseStringVal(tipPercentage),
              people: parseStringVal(peopleNum),
            });
          }}
        />
        <TipSelectionRadioButtonGroup
          onTipSelectionChanged={(tipP) => {
            setTipPercentage(tipP);
            console.log(tipP);
            onInputChanged({
              bill: parseStringVal(bill),
              tipPercentage: parseStringVal(tipP),
              people: parseStringVal(peopleNum),
            });
          }}
        />
        <AmountInput
          value={peopleNum}
          ariaLabel="people-num"
          label="Number of People"
          icon="/icon-person.svg"
          iconWidth={14.6}
          iconHeight={18}
          margin="dense"
          tailwindHeight="h-11"
          onValueChange={(value) => {
            const zero = value == "0";
            if (zero && peopleNum == "") return;

            setPeopleNum(value);
            onInputChanged({
              bill: parseStringVal(bill),
              tipPercentage: parseStringVal(tipPercentage),
              people: parseStringVal(value),
            });
          }}
        />
      </CardContent>
    </Card>
  );
}

export default InputPanel;
