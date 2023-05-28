import { Box } from "@mui/material";
import React, { useState } from "react";
import TipSelectionButton from "./TipSelectionButton";

interface Props {
  onTipSelectionChanged: (tipPercentage: string) => void;
}
interface Tip {
  percentage: string;
  custom: boolean;
  selected: boolean;
}

function TipSelectionRadioButtonGroup({ onTipSelectionChanged }: Props) {
  const [tips] = useState<Tip[]>([
    { percentage: "5%", custom: false, selected: false },
    { percentage: "10%", custom: false, selected: false },
    { percentage: "15%", custom: false, selected: false },
    { percentage: "25%", custom: false, selected: false },
    { percentage: "50%", custom: false, selected: false },
    { percentage: "", custom: true, selected: false },
  ]);

  const [, setCustomPercentage] = useState<string>("");
  const onCustomPercentageChange = (value: number) => {
    setCustomPercentage(value == 0 ? "" : `${value}`);
    tips[tips.length - 1].percentage = value == 0 ? "" : `${value}`;

    // Report selected tip percentage to upstream
    onTipSelectionChanged(value == 0 ? "0%" : `${value}%`);
  };

  const [selectedTip, setSelectedTip] = useState<number>(-1);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // If the target element is not a button
    if (e.target == e.currentTarget || !(e.target instanceof HTMLButtonElement))
      return;

    const selectedBtn = e.target as HTMLButtonElement;

    // If the target button is not a TipSelectionButton
    // Note: selectedBtn.ariaLabel won't work on Firefox
    if (selectedBtn.getAttribute("aria-label") != "tip-selection") return;

    // Get the target tip index
    const i = +selectedBtn.getAttribute("data-id")!;

    // Unselect the currently selected tip
    if (selectedTip != -1) {
      tips[selectedTip].selected = false;
    }

    // Select the target tip
    tips[i].selected = true;
    setSelectedTip(i);

    // Report selected tip percentage to upstream
    if (tips[i].custom) {
      onTipSelectionChanged(
        tips[i].percentage == "" ? "0%" : `${tips[i].percentage}%`
      );
    } else {
      onTipSelectionChanged(tips[i].percentage);
    }
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
            custom={tip.custom}
            selected={tip.selected}
            onCustomPercentageChange={onCustomPercentageChange}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TipSelectionRadioButtonGroup;
