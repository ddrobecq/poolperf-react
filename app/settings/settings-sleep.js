'use client';

import { Chip, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/localdb";
import { _STORAGE_KEY_IS_SLEEP_LOCKED } from "../lib/constants";
import { isMobile, isIOS } from 'react-device-detect';

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
            <Typography variant={'h2'} >Blocage de la veille</Typography>
            <Switch disabled={!isSupported} checked={checked} onChange={(e) => handleChange(e.target.checked)} />
            <Chip label={(isIOS && isMobile) ? 'iPhone' : 'Android'} color={'success'} />
        </Stack>
    );
}