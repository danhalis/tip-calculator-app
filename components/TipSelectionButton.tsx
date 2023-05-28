import React from "react";
import { Button } from "@mui/material";
import { monospace700 } from "@/app/constants";

interface Props {
  key: string;
  dataId: number;
  tip: string;
  custom?: boolean;
  selected?: boolean;
}

function TipSelectionButton({ dataId, tip, custom = false, selected = false }: Props) {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  return (
    <Button
      aria-label="tip-selection"
      data-id={dataId}
      className={`
          ${monospace700.className} tip-selection-btn
          ${custom ? "custom-tip-selection-btn" : ""}
          ${selected ? "tip-selection-btn-selected" : ""}
        `}
      onClick={onClick}
    >
      {tip}
    </Button>
  );
}

export default TipSelectionButton;
