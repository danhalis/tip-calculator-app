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
}

function TipSelectionButton({
  dataId,
  tip,
  custom = false,
  selected = false,
}: Props) {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  return (
    <>
      <Button
        aria-label="tip-selection"
        data-id={dataId}
        className={`
          ${monospace700.className} tip-selection-btn
          ${custom ? "custom-tip-selection-btn" : ""}
          ${selected ? "tip-selection-btn-selected" : ""}
          ${selected && custom ? "hidden" : ""}
        `}
        onClick={onClick}
      >
        {tip}
      </Button>
      {selected && custom && (
        <AmountInput
          ariaLabel="custom-tip"
          tailwindHeight="h-11"
          tailwindFontSize="text-xl"
          focused
        />
      )}
    </>
  );
}

export default TipSelectionButton;
