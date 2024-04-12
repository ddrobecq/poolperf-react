'use client';

import { Chip, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/localdb";
import { _STORAGE_KEY_IS_SLEEP_LOCKED } from "../lib/constants";
import { isMobile, isIOS, isAndroid } from 'react-device-detect';
import TimerOffIcon from '@mui/icons-material/TimerOff';

export default function SleepMode (props) {
    const [defaultSleepLock, setDefaultSleepLock] = useLocalStorage(_STORAGE_KEY_IS_SLEEP_LOCKED, true);
    const [checked, setChecked] = useState(false);
    const isSupported = true;

    function handleChange(value) {
        setChecked(value);
        setDefaultSleepLock (value);
    }

    useEffect (() => {
        setChecked(defaultSleepLock);
    }, [defaultSleepLock]);

    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'} >
            <Stack direction={'row'} spacing={2} alignItems={'center'} >
                <TimerOffIcon fontSize={'large'} color={'primary'} />
                <Typography variant={'h3'} >Blocage de la veille</Typography>
            </Stack>
            <Switch disabled={!isSupported} checked={checked} onChange={(e) => handleChange(e.target.checked)} />
            {(isIOS && isMobile) && <Chip label={'iPhone'} color={'success'} />}
            {(isAndroid) && <Chip label={'Android'} color={'success'} />}
            {!(isIOS && isMobile) && !(isAndroid) && <Chip label={'Non supporté'} color={'error'} />}
        </Stack>
    );
}