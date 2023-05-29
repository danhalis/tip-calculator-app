import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { monospace700 } from "@/app/constants";
import { Input } from "@/components/input/InputPanel";

interface Props {
  className?: string;
  input: Input;
  onResetButtonClicked: () => void;
}

function OutputPanel({ className, input, onResetButtonClicked }: Props) {
  const { bill, tipPercentage, people } = input;

  const totalTip = (bill * tipPercentage) / 100;

  const tipPerPerson = people == 0 ? 0 : totalTip / people;
  const totalPerPerson = people == 0 ? 0 : (bill + totalTip) / people;

  return (
    <Card
      className={`
      ${className}
      flex
      flex-col
      justify-between
      bg-[#00494d]
      rounded-2xl
      mt-1.5
      mb-0.5
    `}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardContent className="pt-9 px-8">
        <Box
          className="
            flex justify-between items-center
            mb-6
          "
        >
          <Box>
            <h2 className="result-amt-label">Tip Amount</h2>
            <h3 className="result-amt-label-unit">/ person</h3>
          </Box>
          <h2 className="result-amt">
            $
            {parseFloat(
              tipPerPerson.toString().match(/^-?\d+(?:\.\d{0,2})?/)![0]
            ).toFixed(2)}
          </h2>
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
          <h2 className="result-amt">${totalPerPerson.toFixed(2)}</h2>
        </Box>
      </CardContent>
      <CardActions className="pb-8 px-8">
        <Button
          variant="contained"
          className={`${monospace700.className} action-btn`}
          fullWidth
          onClick={() => {
            onResetButtonClicked();
          }}
        >
          RESET
        </Button>
      </CardActions>
    </Card>
  );
}

export default OutputPanel;
