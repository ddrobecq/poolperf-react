'use client';

import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useLocalStorage from "../lib/localdb";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { GiPoolTriangle } from "react-icons/gi";
import { createTheme } from '@mui/material/styles';
import { _DEBUG } from "../lib/tools";
import { ThemeProvider, useTheme } from "@emotion/react";
import { _STORAGE_KEY_THEME_MODE } from "../lib/constants";

export default function SettingsTheme (props) {
    const [defaultMode, setDefaultMode] = useLocalStorage(_STORAGE_KEY_THEME_MODE, 'dark');
    const [mode, setMode] = useState (defaultMode);
    const theme = useTheme();

    function handleChangeMode(e, value) {
        setMode (value);
        setDefaultMode (value);
    }

    useEffect (() => {
        _DEBUG('SettingsTheme', 'mode', mode);
    }, [mode]);

    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'} >
            <Typography variant={'h2'} >Mode</Typography>
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleChangeMode} 
                size={'medium'} >
                <ToggleButton value={'dark'} ><DarkModeIcon /></ToggleButton> 
                <ToggleButton value={'light'} ><LightModeIcon/></ToggleButton> 
                <ToggleButton value={'pool'} ><GiPoolTriangle fontSize={30}/></ToggleButton> 
            </ToggleButtonGroup>
        </Stack>
    );
}
