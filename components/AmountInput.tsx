import React from 'react';
import Image from "next/image";
import { InputAdornment, TextField } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

interface Props {
  id: string;
  label: string;
  icon: string;
}

// Override style of MuiOutlinedInput:
// https://mui.com/material-ui/react-text-field/#using-the-theme-style-overrides-api
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    typography: {
      fontFamily: "Space Mono, monospace",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderHoverColor': '#5e7a7d',
            '--TextField-brandBorderFocusedColor': '#5e7a7d',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderWidth: 0
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
              borderWidth: 1
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
              borderWidth: 2
            },
          },
        },
      },
    },
  });

function AmountInput({ id, label, icon }: Props) {
  const outerTheme = useTheme();

  return (
    <div>
      <h2>{label}</h2>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          className="amount-input"
          id={id}
          placeholder="0"
          variant="outlined"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={icon}
                  alt=""
                  width={50}
                  height={50}
                />
              </InputAdornment>
            ),
          }}
        />
      </ThemeProvider>
    </div>
  )
}

export default AmountInput