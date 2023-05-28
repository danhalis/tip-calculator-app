import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import AmountInput from "./AmountInput";
import TipSelectionRadioButtonGroup from "./TipSelectionRadioButtonGroup";

interface Props {
  className: string;
}

function InputPanel({ className }: Props) {
  const [bill, setBill] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<string>("");

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
          }}
        />
        <TipSelectionRadioButtonGroup
          onTipSelectionChanged={(tipP) => {
            console.log(tipP);
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
          }}
        />
      </CardContent>
    </Card>
  );
}

export default InputPanel;
