import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from 'hooks/theme.hook'
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  if (mode === 'dark') {
    return {
      palette: {

        primary: {
          main: "#ffff",
          contrastText: "#32009a",
        },
        secondary: {
          main: "#cac3dc",
          contrastText: "#322e41",
        },
        text: {
          primary: "#e6e1e6",
          secondary: "#e6e1e6",
        },
        background: {
          default: "#1c1b1e",
          paper: "#282828",
        },
        error: {
          main: "#ffb4a9",
          contrastText: "#680003",
        },
        success: {
          main: "#79dd72",
          contrastText: "#003a03",
        },
        info: {
          main: "#99cbff",
          contrastText: "#003257",
        },
        warning: {
          main: "#cace09",
          contrastText: "#313300",
        },
        divider: "#938f99",



      },
    };
  } else {
    // Handle 'light' mode similarly
    return {
      palette: {
        mode: 'light',
        background: {
          default: '#efefef',
          paper: '#d1d1d1',
        },
        primary: {
          main: '#5CB1A7',
        },
        secondary: {
          main: '#5CB1A7',
        },
      },
    };
  }
};

const withMui = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithMuiTheme = (props: P & JSX.IntrinsicAttributes) => {
    const themeContextValue = useTheme();


    const mode: PaletteMode = themeContextValue?.theme as PaletteMode;
    const muiTheme = createTheme(getDesignTokens(mode));

    return (
      <ThemeProvider theme={muiTheme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };
  return ComponentWithMuiTheme;
};

export default withMui;