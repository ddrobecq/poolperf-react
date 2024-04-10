'use client';

import { Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useLocalStorage from "../lib/localdb";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { GiPoolTriangle } from "react-icons/gi";
import { _DEBUG } from "../lib/tools";
import { _DEFAULT_THEME_MODE, _STORAGE_KEY_THEME_MODE } from "../lib/constants";
import { ThemeModeContext } from "../lib/theme-context";

export default function SettingsTheme (props) {
    const [defaultMode, setDefaultMode] = useLocalStorage(_STORAGE_KEY_THEME_MODE, _DEFAULT_THEME_MODE);
    const {mode, setMode} = useContext (ThemeModeContext);

    function handleChangeMode(e, value) {
        setMode (value);
        setDefaultMode (value);
    }

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
