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

import { monospace } from "@/app/constants";

interface Props {
  id: string;
  label: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

// Override style of MuiOutlinedInput:
const muiInputProps: InputBaseComponentProps = {
  min: 0,
  className: `
    ${monospace.className}
    text-[#00494d]
    text-2xl
    text-right
  `,
};

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
            "--TextField-brandBorderHoverColor": "#5e7a7d",
            "--TextField-brandBorderFocusedColor": "#5e7a7d",
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
              borderWidth: 1,
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

function AmountInput({ id, label, icon, iconWidth, iconHeight }: Props) {
  const outerTheme = useTheme();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {};
  return (
    <div>
      <h2 className="field-label">{label}</h2>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          id={id}
          placeholder="0"
          type="number"
          // styles
          className="amt-input"
          variant="outlined"
          fullWidth
          size="small"
          margin="dense"
          inputProps={muiInputProps}
          // icon
          InputProps={{
            startAdornment: (
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
