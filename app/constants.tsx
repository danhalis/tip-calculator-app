import { Space_Mono } from "next/font/google";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export const monospace700 = Space_Mono({
  weight: "700",
  subsets: ["latin"],
});

const normalTextFieldColor = "#9fe8df";
const errorTextFieldColor = "#d18064";
const textFieldThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['"Space Mono"', "monospace"].join(","),
  },
  palette: {
    mode: undefined,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {},
        root: {
          // Hide arrow spinner for number
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
};

export const normalTheme = (outerTheme: Theme) => {
  textFieldThemeOptions.palette!.mode = outerTheme.palette.mode;
  textFieldThemeOptions.components!.MuiTextField!.styleOverrides!.root = {
    "--TextField-brandBorderHoverColor": normalTextFieldColor,
    "--TextField-brandBorderFocusedColor": normalTextFieldColor,
    "& label.Mui-focused": {
      color: "var(--TextField-brandBorderFocusedColor)",
    },
  };

  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.notchedOutline =
    {
      borderWidth: 0,
    };
  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.root = {
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderHoverColor)",
      borderWidth: 2,
    },
    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderFocusedColor)",
      borderWidth: 2,
    },
  };

  return createTheme(textFieldThemeOptions);
};

export const focusedTheme = (outerTheme: Theme) => {
  textFieldThemeOptions.palette!.mode = outerTheme.palette.mode;
  textFieldThemeOptions.components!.MuiTextField!.styleOverrides!.root = {
    "--TextField-brandBorderColor": normalTextFieldColor,
    "--TextField-brandBorderHoverColor": normalTextFieldColor,
    "--TextField-brandBorderFocusedColor": normalTextFieldColor,
    "& label.Mui-focused": {
      color: "var(--TextField-brandBorderFocusedColor)",
    },
  };

  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.notchedOutline =
    {
      borderColor: "var(--TextField-brandBorderColor)",
      borderWidth: 2,
    };
  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.root = {
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderHoverColor)",
      borderWidth: 2,
    },
    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderFocusedColor)",
      borderWidth: 2,
    },
  };

  return createTheme(textFieldThemeOptions);
};

export const errorTheme = (outerTheme: Theme) => {
  textFieldThemeOptions.palette!.mode = outerTheme.palette.mode;
  textFieldThemeOptions.components!.MuiTextField!.styleOverrides!.root = {
    "--TextField-brandBorderColor": errorTextFieldColor,
    "--TextField-brandBorderHoverColor": errorTextFieldColor,
    "--TextField-brandBorderFocusedColor": errorTextFieldColor,
    "& label.Mui-focused": {
      color: "var(--TextField-brandBorderFocusedColor)",
    },
  };

  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.notchedOutline =
    {
      borderColor: "var(--TextField-brandBorderColor)",
      borderWidth: 2,
    };
  textFieldThemeOptions.components!.MuiOutlinedInput!.styleOverrides!.root = {
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderHoverColor)",
      borderWidth: 2,
    },
    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "var(--TextField-brandBorderFocusedColor)",
      borderWidth: 2,
    },
  };

  return createTheme(textFieldThemeOptions);
};
