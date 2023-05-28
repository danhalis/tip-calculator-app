import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import TipSelectionRadioButtonGroup from "./TipSelectionRadioButtonGroup";
import { useForm } from "react-hook-form";
import InputFormSchema from "./InputFormSchema";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

export interface Input {
  bill: number;
  tipPercentage: number;
  people: number;
}
interface Props {
  className: string;
  onInputChanged: ({ bill, tipPercentage, people }: Input) => void;
}

function InputPanel({ className, onInputChanged }: Props) {
  const [bill, setBill] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<string>("");

  const parseStringVal = (stringVal: string) =>
    stringVal == "" ? 0 : parseFloat(stringVal);

  const validatorResolver = classValidatorResolver(InputFormSchema);
  const {
    trigger,
    register,
    formState: { errors },
    control,
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
    (async () => trigger("people"))();
  }, [bill]);

  return (
    <Card
      className={`${className}`}
      style={{ border: "none", boxShadow: "none" }}
    >
      <CardContent>
        <form>
          <AmountInput
            // form hook
            control={control}
            formRegisterFields={register("bill", { valueAsNumber: true })}
            // value binding
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
              const zero = value == "0";
              if (zero && bill == "") return;
              setBill(value);

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
          />
          <AmountInput
            // form hook
            control={control}
            formRegisterFields={register("people", { valueAsNumber: true })}
            // value binding
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
              const zero = value == "0";
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
