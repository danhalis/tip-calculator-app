import React from "react";
import { Button } from "@mui/material";
import { monospace700 } from "@/app/constants";
import AmountInput from "./AmountInput";

interface Props {
  key: string;
  dataId: number;
  tip: string;
  custom?: boolean;
  selected?: boolean;
  onCustomPercentageChange?: (percentage: number) => void;
}

function TipSelectionButton({
  dataId,
  tip,
  custom = false,
  selected = false,
  onCustomPercentageChange = () => {},
}: Props) {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  return (
    <>
      <Button
        aria-label="tip-selection" // -> To identify as TipSelectionButton
        data-id={dataId}
        className={`
          ${monospace700.className} tip-selection-btn
          ${custom ? "custom-tip-selection-btn" : ""}
          ${selected ? "tip-selection-btn-selected" : ""}
          ${selected && custom ? "hidden" : ""}
        `}
        onClick={onClick}
      >
        {custom ? "Custom" : tip}
      </Button>
      {selected && custom && (
        <AmountInput
          value={tip} // -> Persist previously entered value
          ariaLabel="custom-tip"
          tailwindHeight="h-11"
          tailwindFontSize="text-xl"
          focused={selected}
          autoFocus
          onValueChange={(value) => {
            let parsed = parseFloat(value);
            if (Number.isNaN(parsed)) parsed = 0;

            // Report updated custom percentage to upstream
            onCustomPercentageChange(parsed);
          }}
        />
      )}
    </>
  );
}

export default TipSelectionButton;
