import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily: "'Source Code Pro', 'Inconsolata', monospace",
        fontSize: 16,
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
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#d6c547',
        },
        secondary: {
            main: '#ff75bf',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: 'black',
        }
    },
});

export default theme;
