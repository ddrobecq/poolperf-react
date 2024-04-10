'use client';

import { createContext, useEffect, useState } from "react";
import useLocalStorage from "./localdb";
import { _DEBUG } from "./tools";
import { _DEFAULT_THEME_MODE, _STORAGE_KEY_THEME_MODE } from "./constants";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme, poolTheme } from "./theme";
import { CssBaseline } from '@mui/material';

export const ThemeModeContext = createContext(null);

export default function ThemeModeContextProvider({children}) {
    const [ defaultMode, setDefaultMode ] = useLocalStorage(_STORAGE_KEY_THEME_MODE, _DEFAULT_THEME_MODE);
    const [mode, setMode] = useState(_DEFAULT_THEME_MODE);
    const [currentTheme, setCurrentTheme] = useState(darkTheme);

    useEffect(() => {
        setMode(defaultMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        switch (mode) {
            case 'dark':
                setCurrentTheme(darkTheme);
                break;
            case 'light':
                setCurrentTheme(lightTheme);
                break;
            case 'pool':
                setCurrentTheme(poolTheme);
                break;
            default:
                setCurrentTheme(darkTheme);
                break;
        }
    }, [mode]);

    return (
        <ThemeModeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={currentTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}