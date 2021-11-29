import { PaletteMode } from '@mui/material';
import React from 'react';

export interface IColorModeContext {
    mode: PaletteMode;
    nextMode: PaletteMode;
    toggleMode: () => void;
}

export const ColorModeContext = React.createContext({} as IColorModeContext);
