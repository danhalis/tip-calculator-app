import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  InputAdornment,
  InputBaseComponentProps,
  TextField,
} from "@mui/material";

import { ThemeProvider, useTheme } from "@mui/material/styles";
import {
  monospace700,
  normalTheme,
  focusedTheme,
  errorTheme,
} from "@/app/constants";

import { Controller, Control, UseFormRegisterReturn } from "react-hook-form";
import InputFormSchema from "./InputFormSchema";

interface AmountInputProps {
  // form hook
  control: Control<InputFormSchema, any>;
  formRegisterFields: UseFormRegisterReturn<
    "bill" | "tipPercentage" | "people"
  >;
  // value
  min?: number;
  max?: number;
  allowedKeyStroke?: string | RegExp;
  allowedValueRegex?: string | RegExp;
  value?: string;
  // error
  error?: boolean;
  helperText?: string;
  // styles
  ariaLabel: string;
  label?: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  focused?: boolean;
  autoFocus?: boolean;
  size?: "medium" | "small";
  tailwindHeight?: string;
  margin?: "none" | "dense" | "normal";
  tailwindFontSize?: string;
  // events
  onValueChange?: (value: string) => void;
}

function AmountInput({
  // form hook
  control,
  formRegisterFields,
  // value
  min = 0,
  max,
  allowedKeyStroke = /^\d|\.$/g,
  allowedValueRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
  value,
  // error
  error,
  helperText,
  // styles
  ariaLabel,
  label,
  icon,
  iconWidth,
  iconHeight,
  size,
  tailwindHeight,
  margin,
  focused = false,
  autoFocus = false,
  tailwindFontSize = "text-2xl",
  // events
  onValueChange = () => {},
}: AmountInputProps) {
  // Override style of MuiOutlinedInput:
  const outerTheme = useTheme();
  const muiInputProps: InputBaseComponentProps = {
    min,
    max,
    className: `
      ${monospace700.className}
      text-[#00494d]
      caret-[#9fe8df]
      ${tailwindFontSize}
      text-right
    `,
  };

  // Keep track of focused state
  const [typing, setTyping] = useState<boolean>(focused);

  return (
    <Box>
      <Box className="flex justify-between">
        {label && <h2 className="field-label">{label}</h2>}
        {error && <h2 className="error-label">{helperText}</h2>}
      </Box>
      <Controller
        name={formRegisterFields.name}
        control={control}
        render={() => (
          // https://mui.com/material-ui/react-text-field/#using-the-theme-style-overrides-api
          <ThemeProvider
            theme={
              // If error
              error
                ? // Set error style
                  errorTheme(outerTheme)
                : // If user is typing
                typing
                ? // Set focused style
                  focusedTheme(outerTheme)
                : // Set normal style
                  normalTheme(outerTheme)
            }
          >
            <TextField
              // form hook
              {...formRegisterFields}
              // value
              value={value}
              type="text" // <- type="number" will wipe the whole text field once a non-number character is entered
              // styles
              aria-label={ariaLabel}
              placeholder={`${min}`}
              className="amt-input"
              variant="outlined"
              fullWidth
              size={size}
              margin={margin}
              inputProps={muiInputProps}
              focused={focused}
              autoFocus={autoFocus}
              // icon
              InputProps={{
                className: `${tailwindHeight}`,
                startAdornment: icon && (
                  <InputAdornment position="start">
                    <Image
                      src={icon}
                      alt=""
                      width={iconWidth}
                      height={iconHeight}
                    />
                  </InputAdornment>
                ),
              }}
              // events
              onChange={(e) => {
                const value = e.target.value;

                // If the change doesn't match the valid regex pattern
                // -> No change to the value
                // (This can prevent copy-pasting invalid string)
                if (value && value != "." && !value.match(allowedValueRegex))
                  return;

                // Report new amount to upstream
                onValueChange(
                  // If value is something like ".3"
                  value[0] == "." && value.length > 1
                    ? // Convert it to "0.3"
                      `${parseFloat(value)}`
                    : // Else keep value as is (Example: "2", ".", "2.")
                      value
                );

                // If the value is empty or ".", early return without calling form's onChange
                // -> form won't error out on empty string
                if (value == "" || value == ".") return;
                // Trigger form's onChange
                formRegisterFields.onChange(e);
              }}
              onFocus={() => {
                setTyping(true);
              }}
              onBlur={(e) => {
                setTyping(false);
                // If the value is empty or ".", early return without calling form's onBlur
                // -> form won't error out on empty string
                if (e.target.value == "" || value == ".") return;
                // Trigger form's onBlur
                formRegisterFields.onBlur(e);
              }}
              onKeyPress={(e) => {
                if (allowedKeyStroke && !e.key.match(allowedKeyStroke)) {
                  e.preventDefault();
                }
              }}
            />
          </ThemeProvider>
        )}
      />
    </Box>
  );
}

export default AmountInput;
