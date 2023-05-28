import { Box } from "@mui/material";
import React, { useState } from "react";
import TipSelectionButton from "./TipSelectionButton";

interface Tip {
  percentage: string;
  selected: boolean;
}

function TipSelectionRadioButtonGroup() {
  const [tips] = useState<Tip[]>([
    { percentage: "5%", selected: false },
    { percentage: "10%", selected: false },
    { percentage: "15%", selected: false },
    { percentage: "25%", selected: false },
    { percentage: "50%", selected: false },
    { percentage: "Custom", selected: false },
  ]);

  const [selectedTip, setSelectedTip] = useState<number>(-1);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target == e.currentTarget || !(e.target instanceof HTMLButtonElement))
      return;

    const selectedBtn = e.target as HTMLButtonElement;
    if (selectedBtn.ariaLabel != "tip-selection") return;

    // Get the target tip index
    const i = +selectedBtn.getAttribute("data-id")!;

    // Unselect the currently selected tip
    if (selectedTip != -1) {
      tips[selectedTip].selected = false;
    }

    // Select the target tip
    tips[i].selected = true;
    setSelectedTip(i);
  };

  return (
    <Box className="my-5">
      <h2 className="field-label">Select Tip %</h2>
      <Box className="grid grid-cols-3 gap-3 mt-2" onClick={onClick}>
        {...tips.map((tip, i) => (
          <TipSelectionButton
            key={`${i}`}
            dataId={i}
            tip={tip.percentage}
            custom={tip.percentage.toLowerCase() == "custom"}
            selected={tip.selected}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TipSelectionRadioButtonGroup;
