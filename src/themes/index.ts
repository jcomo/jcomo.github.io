import { PaletteMode } from '@mui/material';
import { createThemeWithMode as createSiteTheme } from './site';
import { default as cocktails } from './cocktails';

export type ThemeId = 'site' | 'cocktails';

export const createThemeInstance = (
    mode: PaletteMode,
    themeId: ThemeId = 'site',
) => {
    return themeId === 'site' ? createSiteTheme(mode) : cocktails;
};
