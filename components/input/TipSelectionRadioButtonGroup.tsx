import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TipSelectionButton from "@/components/input/TipSelectionButton";
import { Control, UseFormRegisterReturn } from "react-hook-form";
import InputFormSchema from "@/components/input/InputFormSchema";

interface Props {
  // form hook
  control: Control<InputFormSchema, any>;
  formRegisterFields: UseFormRegisterReturn<"tipPercentage">;
  // error
  error?: boolean;
  helperText?: string;
  // signals
  resetSignal: boolean;
  // events
  onTipSelectionChanged: (tipPercentage: string) => void;
  onReset?: () => void;
}

interface Tip {
  percentage: string;
  custom: boolean;
  selected: boolean;
}

function TipSelectionRadioButtonGroup({
  // form hook
  control,
  formRegisterFields,
  // error
  error,
  helperText,
  // signals
  resetSignal = false,
  // events
  onTipSelectionChanged,
  onReset = () => {},
}: Props) {
  const defaultTips = [
    { percentage: "5%", custom: false, selected: false },
    { percentage: "10%", custom: false, selected: false },
    { percentage: "15%", custom: false, selected: false },
    { percentage: "25%", custom: false, selected: false },
    { percentage: "50%", custom: false, selected: false },
    { percentage: "", custom: true, selected: false },
  ];
  const [tips, setTips] = useState<Tip[]>(defaultTips);

  const [selectedTipIndex, setSelectedTipIndex] = useState<number>(-1);
  const [selectionReset, setSelectionReset] = useState<boolean>(true);

  const resetSelections = () => {
    setTips(defaultTips);
    setSelectedTipIndex(-1);
    setSelectionReset(true);
    onTipSelectionChanged("0%");
  };

  // Reset tip selection once received reset signal
  useEffect(() => {
    if (!resetSignal) return;
    resetSelections();
  }, [resetSignal]);

  // Report to upstream that reset is done once the entire tips array is set to default
  useEffect(() => {
    if (!selectionReset) return;
    onReset();
  }, [tips]);

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

    // If this tip is already selected
    if (i == selectedTipIndex) {
      // Unselect the tip (= Reset)
      tips[i].selected = false;
      setSelectedTipIndex(-1);
      onTipSelectionChanged("0%");
      setSelectionReset(true);
      return;
    }

    // From this point forward, the tip will be changed ...

    // Unselect the currently selected tip
    if (selectedTipIndex != -1) {
      tips[selectedTipIndex].selected = false;
    }

    // Select the target tip
    tips[i].selected = true;
    setSelectedTipIndex(i);

    // Report selected tip percentage to upstream

    // If it's custom tip
    if (tips[i].custom) {
      onTipSelectionChanged(
        tips[i].percentage == "" ? "0%" : `${tips[i].percentage}%`
      );
    }
    // If it's preset tip
    else {
      onTipSelectionChanged(tips[i].percentage);
    }

    setSelectionReset(false);
  };

  const [, setCustomPercentage] = useState<string>("");
  const onCustomPercentageChange = (value: string) => {
    const zero = value == "" || value == "0";
    if (zero && tips[tips.length - 1].percentage == "") return;

    setCustomPercentage(zero ? "" : `${value}`);
    tips[tips.length - 1].percentage = zero ? "" : `${value}`;

    setSelectionReset(false);

    // If the user were entering a "." (incomplete decimal number)
    // -> early return without reporting change to upstream
    if (value == ".") return;
    // Report selected tip percentage to upstream
    onTipSelectionChanged(zero ? "0%" : `${value}%`);
  };

  return (
    <Box className="space-y-4">
      <Box className="flex justify-between">
        <h2 className="field-label">Select Tip %</h2>
        {tips[selectedTipIndex].custom && error && (
          <h2 className="error-label">{helperText}</h2>
        )}
      </Box>
      <Box
        className="grid grid-cols-2 gap-3 mt-2 lg:grid-cols-3"
        onClick={onClick}
      >
        {...tips.map((tip, i) => (
          <TipSelectionButton
            // form hook
            control={control}
            formRegisterFields={formRegisterFields}
            // error
            error={error}
            // value
            key={`${i}`}
            dataId={i}
            tip={tip.percentage}
            custom={tip.custom}
            selected={tip.selected}
            // events
            onCustomPercentageChange={onCustomPercentageChange}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TipSelectionRadioButtonGroup;
