import React from 'react';

export type PaletteMode = 'light' | 'dark';

export interface IColorModeContext {
    mode: PaletteMode;
    nextMode: PaletteMode;
    toggleMode: () => void;
}

export const ColorModeContext = React.createContext({} as IColorModeContext);
