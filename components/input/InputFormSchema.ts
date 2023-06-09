import { ValidateIf, IsNumber, Min, Max } from "class-validator";

export default class InputFormSchema {
  @IsNumber({}, { message: "Please enter a number" })
  @Min(0, { message: "Can't be less than zero" })
  bill: number;

  @IsNumber({}, { message: "Please enter a number" })
  @Min(0, { message: "Can't be less than 0%" })
  @Max(100, { message: "Tip exceeds 100%" })
  tipPercentage?: number;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "Please enter a number" })
  @ValidateIf((input: InputFormSchema) => input.bill > 0)
  @Min(1, { message: "Can't be zero" })
  people: number;
}
