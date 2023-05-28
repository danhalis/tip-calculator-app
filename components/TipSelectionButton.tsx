import React from "react";
import { Button } from "@mui/material";
import { monospace700 } from "@/app/constants";
import AmountInput from "./AmountInput";
import { Control, UseFormRegisterReturn } from "react-hook-form";
import InputFormSchema from "./InputFormSchema";

interface Props {
  control: Control<InputFormSchema, any>;
  formRegisterFields: UseFormRegisterReturn<"tipPercentage">;
  key: string;
  dataId: number;
  tip: string;
  custom?: boolean;
  selected?: boolean;
  // error
  error?: boolean;
  helperText?: string;
  onCustomPercentageChange?: (percentage: string) => void;
}

function TipSelectionButton({
  // form hook
  control,
  formRegisterFields,
  // error
  error = false,
  helperText,
  // value
  dataId,
  tip,
  custom = false,
  selected = false,
  // events
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
          // form hook
          control={control}
          formRegisterFields={formRegisterFields}
          // value
          value={tip} // -> Persist previously entered value
          // error
          error={error}
          helperText={helperText}
          // styles
          ariaLabel="custom-tip"
          tailwindHeight="h-11"
          tailwindFontSize="text-xl"
          focused={selected}
          autoFocus
          // events
          onValueChange={(value) => {
            let parsed = parseFloat(value);
            if (Number.isNaN(parsed)) parsed = 0;

            // Report updated custom percentage to upstream
            onCustomPercentageChange(`${parsed}`);
          }}
        />
      )}
    </>
  );
}

export default TipSelectionButton;
