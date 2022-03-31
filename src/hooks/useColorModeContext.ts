import React from 'react';
import { IColorModeContext, PaletteMode } from '../components/ColorMode';

const getNextMode = (mode: PaletteMode) => {
    return mode === 'dark' ? 'light' : 'dark';
};

export const useColorModeContext = (): [IColorModeContext] => {
    const [mode, setMode] = React.useState<PaletteMode>('light');

    const value = React.useMemo<IColorModeContext>(
        () => ({
            mode: mode,
            nextMode: getNextMode(mode),
            toggleMode: () => setMode(getNextMode),
        }),
        [mode],
    );

    // Set class="dark" on the HTML element so that dark: selectors work
    // in tailwind
    React.useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    // TODO: figure out how to enable dark mode from media query
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // useEffect(() => {
    //     setMode(prefersDarkMode ? 'dark' : 'light');
    // }, [prefersDarkMode]);

    return [value];
};
