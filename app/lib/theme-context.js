'use client';

import { createContext, useEffect, useState } from "react";
import useLocalStorage from "./localdb";
import { _DEBUG } from "./tools";
import { _STORAGE_KEY_THEME_MODE } from "./constants";

export const ThemeModeContext = createContext(null);

export default function ThemeModeContextProvider({children}) {
    const [ defaultMode, setDefaultMode ] = useLocalStorage(_STORAGE_KEY_THEME_MODE, 'dark');
    const [mode, setMode] = useState('dark');

    useEffect(() => {
        setMode(defaultMode);
    },[]);

    return (
        <ThemeModeContext.Provider value={{mode, setMode}}>
            {children}
        </ThemeModeContext.Provider>
    );
}