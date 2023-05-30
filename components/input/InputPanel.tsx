import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import AmountInput from "@/components/input/AmountInput";
import TipSelectionRadioButtonGroup from "@/components/input/TipSelectionRadioButtonGroup";
import { useForm } from "react-hook-form";
import InputFormSchema from "@/components/input/InputFormSchema";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

export interface Input {
  bill: number;
  tipPercentage: number;
  people: number;
}
interface Props {
  className: string;
  resetSignal: boolean;
  onInputChanged: ({ bill, tipPercentage, people }: Input) => void;
  onResetSignalReceived: () => void;
}

function InputPanel({
  className,
  resetSignal,
  onInputChanged,
  onResetSignalReceived,
}: Props) {
  const [bill, setBill] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<string>("");
  const [resetTipSelection, setResetTipSelection] = useState<boolean>(false);
  const [tipPercentage, setTipPercentage] = useState<string>("");

  const parseStringVal = (stringVal: string) =>
    stringVal == "" ? 0 : parseFloat(stringVal);

  // Get form hook
  const validatorResolver = classValidatorResolver(InputFormSchema);
  const {
    register,
    formState: { errors },
    control,
    trigger,
    reset,
  } = useForm<InputFormSchema>({
    mode: "all",
    resolver: validatorResolver,
    defaultValues: {
      bill: 0,
      tipPercentage: 0,
      people: 0,
    },
  });

  // Revalidate people number on bill value changed
  useEffect(() => {
    trigger("people");
  }, [bill]);

  // Reset input values once received reset signal
  useEffect(() => {
    if (!resetSignal) return;
    // Report to upstream that reset signal is received
    onResetSignalReceived();

    if (bill == "" && parseStringVal(tipPercentage) == 0 && peopleNum == "")
      return;
    reset();
    setBill("");
    // Turn on reset signal for TipSelectionRadioButtonGroup
    setResetTipSelection(true);
    setPeopleNum("");

    // Report to upstream
    onInputChanged({
      bill: 0,
      tipPercentage: 0,
      people: 0,
    });
  }, [resetSignal]);

  return (
    <Card
      className={`${className}`}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardContent>
        <form className="space-y-8">
          <AmountInput
            // form hook
            control={control}
            formRegisterFields={register("bill", { valueAsNumber: true })}
            // value
            value={bill}
            // error
            error={errors.bill != null}
            helperText={errors.bill?.message}
            // styles
            ariaLabel="bill"
            label="Bill"
            icon="/icon-dollar.svg"
            iconWidth={11.6}
            iconHeight={18}
            margin="dense"
            tailwindHeight="h-11"
            // events
            onValueChange={(value) => {
              const zero = value == "" || value == "0";
              // If bill is already 0
              if (zero && bill == "") return;
              setBill(value);

              // If the user were entering a "." (incomplete decimal number)
              // -> early return without reporting change to upstream
              if (value == ".") return;
              // Report updated input to upstream
              onInputChanged({
                bill: parseStringVal(value),
                tipPercentage: parseStringVal(tipPercentage),
                people: parseStringVal(peopleNum),
              });
            }}
          />
          <TipSelectionRadioButtonGroup
            // form hook
            control={control}
            formRegisterFields={register("tipPercentage", {
              valueAsNumber: true,
            })}
            resetSignal={resetTipSelection}
            // error
            error={errors.tipPercentage != null}
            helperText={errors.tipPercentage?.message}
            // events
            onTipSelectionChanged={(tipP) => {
              setTipPercentage(tipP);

              // Report updated input to upstream
              onInputChanged({
                bill: parseStringVal(bill),
                tipPercentage: parseStringVal(tipP),
                people: parseStringVal(peopleNum),
              });
            }}
            onReset={() => {
              // Turn off reset signal for TipSelectionRadioButtonGroup
              setResetTipSelection(false);
            }}
          />
          <AmountInput
            // form hook
            control={control}
            formRegisterFields={register("people", { valueAsNumber: true })}
            // value
            allowedKeys={"\\d"}
            value={peopleNum}
            // error
            error={errors.people != null}
            helperText={errors.people?.message}
            // styles
            ariaLabel="people-num"
            label="Number of People"
            icon="/icon-person.svg"
            iconWidth={14.6}
            iconHeight={18}
            margin="dense"
            tailwindHeight="h-11"
            // events
            onValueChange={(value) => {
              const zero = value == "" || value == "0";
              // If number of people is already 0
              if (zero && peopleNum == "") return;
              setPeopleNum(value);

              // Report updated input to upstream
              onInputChanged({
                bill: parseStringVal(bill),
                tipPercentage: parseStringVal(tipPercentage),
                people: parseStringVal(value),
              });
            }}
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default InputPanel;
