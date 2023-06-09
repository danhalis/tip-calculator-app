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
import InputFormSchema from "@/components/input/InputFormSchema";

interface AmountInputProps {
  // form hook
  control: Control<InputFormSchema, any>;
  formRegisterFields: UseFormRegisterReturn<
    "bill" | "tipPercentage" | "people"
  >;
  // value
  min?: number;
  max?: number;
  allowedKeys?: string;
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
  allowedKeys = "\\d|\\.",
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
      !font-bold
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
                      alt={`Icon of input field for ${ariaLabel}`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  </InputAdornment>
                ),
              }}
              // events
              onChange={(e) => {
                const value = e.target.value;

                // This check is for Chrome on Android devices since onKeyPress has no effect there
                // If the new value contains any invalid characters
                if (value.replaceAll(new RegExp(allowedKeys, "g"), "") != "") {
                  e.preventDefault();
                  return;
                }

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
                if (value == ".") return;

                // If the value is not empty string
                if (value == "") {
                  // Override empty string with minumum value
                  // -> form won't error out on empty string
                  e.target.value = `${min}`;
                }
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
              // Note: onKeyPress is not triggered by Chrome on Android devices
              // https://stackoverflow.com/questions/36753548/keycode-on-android-is-always-229
              // https://bugs.chromium.org/p/chromium/issues/detail?id=118639
              onKeyPress={(e) => {
                if (
                  allowedKeys &&
                  !e.key.match(new RegExp(`^${allowedKeys}$`))
                ) {
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
