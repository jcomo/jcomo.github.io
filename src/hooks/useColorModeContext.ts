import { PaletteMode, Theme, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { IColorModeContext } from '../components/ColorMode';
import { createThemeInstance, ThemeId } from '../themes';

const getNextMode = (mode: PaletteMode) => {
    return mode === 'dark' ? 'light' : 'dark';
};

export const useColorModeContext = (
    themeId?: ThemeId,
): [IColorModeContext, Theme] => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const theme = React.useMemo(
        () => createThemeInstance(mode, themeId),
        [mode, themeId],
    );

    const value = React.useMemo<IColorModeContext>(
        () => ({
            mode: theme.palette.mode,
            nextMode: getNextMode(theme.palette.mode),
            toggleMode: () => setMode(getNextMode),
        }),
        [theme],
    );

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    return [value, theme];
};
