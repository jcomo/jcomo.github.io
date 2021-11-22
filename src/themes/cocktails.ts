import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { letterSpacing } from '@mui/system';

// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily: "'Merriweather', serif",
        fontSize: 14,
        h1: {
            fontSize: 48,
            fontWeight: 600,
            fontFamily: 'Source Sans Pro',
            letterSpacing: '-0.04em',
            lineHeight: 0.8,
        },
        h2: {
            fontSize: 32,
            fontWeight: 600,
        },
        h3: {
            fontSize: 28,
            fontWeight: 500,

        },
        h4: {
            fontSize: 24,
            fontWeight: 600,
        },
        h5: {
            fontSize: 18,
            fontWeight: 600,
        },
        h6: {
            fontSize: 18,
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#000',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;