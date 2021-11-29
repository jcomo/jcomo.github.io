import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const createThemeWithMode = (mode: PaletteMode) => {
    return createTheme({
        palette: getPalette(mode),
        typography: {
            fontFamily: "'Source Code Pro', 'Inconsolata', monospace",
            fontSize: 16,
            allVariants: {
                letterSpacing: -0.25,
            },
            h1: {
                fontSize: 36,
                fontWeight: 600,
            },
            h2: {
                fontSize: 32,
                fontWeight: 600,
            },
            h3: {
                fontSize: 28,
                fontWeight: 600,
            },
            h4: {
                fontSize: 24,
                fontWeight: 600,
            },
            h5: {
                fontSize: 20,
                fontWeight: 600,
            },
            h6: {
                fontSize: 20,
            },
        },
    });
};

const getPalette = (mode: PaletteMode) => ({
    mode,
    ...(mode === 'light'
        ? {
              primary: {
                  main: '#1914e9',
              },
              secondary: {
                  main: '#e10c7e',
              },
              error: {
                  main: red.A400,
              },
          }
        : {
              primary: {
                  main: '#ffec5c',
              },
              secondary: {
                  main: '#ff75bf',
              },
              error: {
                  main: red.A400,
              },
              background: {
                  default: 'black',
              },
          }),
});
