'use client';

import { Chip, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/localdb";
import useSleepLock from "../lib/sleepLock";
import { _STORAGE_KEY_IS_SLEEP_LOCKED } from "../lib/constants";

export default function SleepMode (props) {
    const [isSupported, isActive, request, release] = useSleepLock();
    const [defaultSleepLock, setDefaultSleepLock] = useLocalStorage(_STORAGE_KEY_IS_SLEEP_LOCKED, true);
    const [checked, setChecked] = useState(false);

    function handleChange(value) {
        setChecked(value);
        setDefaultSleepLock (value);
    }

    useEffect (() => {
        setChecked(defaultSleepLock);
    }, [defaultSleepLock]);

    useEffect(() => {
        if (isSupported) {
            if (checked && !isActive) request ();
            else if (!checked && isActive) release();
        }
    }, [checked, isSupported, isActive, request, release]);
    
    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'} >
            <Typography variant={'h2'} >Blocage de la veille</Typography>
            <Switch disabled={!isSupported} checked={checked} onChange={(e) => handleChange(e.target.checked)} />
            {(isSupported)
            ? <Chip key={'active'} label={(isActive) ? 'Activé' : 'Désactivé'} color={(isActive) ? 'success' : 'warning'} />
            : <Chip key={'supported'} label={'Non Supporté'} color={'error'} />}
        </Stack>
    );
}