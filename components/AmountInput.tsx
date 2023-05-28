import React, { ChangeEvent } from "react";
import Image from "next/image";
import {
  InputAdornment,
  InputBaseComponentProps,
  TextField,
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";

import { monospace700 } from "@/app/constants";

interface Props {
  value?: string;
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
  onValueChange?: (value: string) => void;
}

// https://mui.com/material-ui/react-text-field/#using-the-theme-style-overrides-api
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderHoverColor": "#9fe8df",
            "--TextField-brandBorderFocusedColor": "#9fe8df",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderWidth: 0,
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
              borderWidth: 2,
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
              borderWidth: 2,
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
      },
    },
  });

function AmountInput({
  value = "",
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
  onValueChange = () => {},
}: Props) {
  // Override style of MuiOutlinedInput:
  const outerTheme = useTheme();
  const muiInputProps: InputBaseComponentProps = {
    min: 0,
    className: `
      ${monospace700.className}
      text-[#00494d]
      caret-[#9fe8df]
      ${tailwindFontSize}
      text-right
    `,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Report new amount to upstream
    onValueChange(value);
  };

  return (
    <div>
      {label && <h2 className="field-label">{label}</h2>}
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          value={value}
          aria-label={ariaLabel}
          placeholder="0"
          type="number"
          focused={focused}
          autoFocus={autoFocus}
          // styles
          className="amt-input"
          variant="outlined"
          fullWidth
          size={size}
          margin={margin}
          inputProps={muiInputProps}
          // icon
          InputProps={{
            className: `${tailwindHeight}`,
            startAdornment: (
              <InputAdornment position="start">
                {icon && (
                  <Image
                    src={icon}
                    alt=""
                    width={iconWidth}
                    height={iconHeight}
                  />
                )}
              </InputAdornment>
            ),
          }}
          // events
          onChange={onChange}
          onKeyPress={(event) => {
            if (!event.key.match(/^\d$/g)) {
              event.preventDefault();
            }
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default AmountInput;
