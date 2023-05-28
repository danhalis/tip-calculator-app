import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { monospace700 } from "@/app/constants";
import { Input } from "./InputPanel";

interface Props {
  className?: string;
  input: Input;
}

function OutputPanel({ className, input }: Props) {
  const {
    bill,
    tipPercentage,
    people,
  } = input;

  const totalTip = (bill * tipPercentage / 100);

  return (
    <Card
      className={`
      ${className}
      flex
      flex-col
      justify-between
      bg-[#00494d]
      rounded-2xl
      shadow-none
      border-none
    `}
    >
      <CardContent className="pt-10 px-8">
        <Box
          className="
            flex justify-between items-center
            mb-8
          "
        >
          <Box>
            <h2 className="result-amt-label">Tip Amount</h2>
            <h3 className="result-amt-label-unit">/ person</h3>
          </Box>
          <h2 className="result-amt">${totalTip / people}</h2>
        </Box>
        <Box
          className="
            flex justify-between items-center
          "
        >
          <Box>
            <h2 className="result-amt-label">Total</h2>
            <h3 className="result-amt-label-unit">/ person</h3>
          </Box>
          <h2 className="result-amt">${(bill + totalTip) / people}</h2>
        </Box>
      </CardContent>
      <CardActions className="pb-8 px-8">
        <Button
          variant="contained"
          className={`${monospace700.className} action-btn`}
          fullWidth
        >
          RESET
        </Button>
      </CardActions>
    </Card>
  );
}

export default OutputPanel;
