import { Card, CardContent } from "@mui/material";
import React from "react";
import AmountInput from "./AmountInput";
import TipSelectionRadioButtonGroup from "./TipSelectionRadioButtonGroup";

interface Props {
  className: string;
}

function InputPanel({ className }: Props) {
  return (
    <Card
      className={`${className}`}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardContent>
        <AmountInput
          ariaLabel="bill"
          label="Bill"
          icon="/icon-dollar.svg"
          iconWidth={11.6}
          iconHeight={18}
          margin="dense"
          tailwindHeight="h-11"
        />
        <TipSelectionRadioButtonGroup />
        <AmountInput
          ariaLabel="people-num"
          label="Number of People"
          icon="/icon-person.svg"
          iconWidth={14.6}
          iconHeight={18}
          margin="dense"
          tailwindHeight="h-11"
        />
      </CardContent>
    </Card>
  );
}

export default InputPanel;
