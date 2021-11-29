import { PaletteMode } from '@mui/material';
import { createThemeWithMode as createSiteTheme } from './site';
import { createThemeWithMode as createCocktailsTheme } from './cocktails';

export type ThemeId = 'site' | 'cocktails';

export const createThemeInstance = (mode: PaletteMode, themeId?: ThemeId) => {
    switch (themeId) {
        case 'cocktails':
            return createCocktailsTheme(mode);
        default:
            return createSiteTheme(mode);
    }
};
