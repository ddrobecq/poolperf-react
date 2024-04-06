'use client';

import { Chip, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/localdb";
import useSleepLock from "../lib/sleepLock";

export default function SleepMode (props) {
    const [isSupported, isActive, request, release] = useSleepLock();
    const [sleepLock, setSleepLock] = useLocalStorage('is-sleep-locked', true);
    const [checked, setChecked] = useState(sleepLock);

    function handleChange(value) {
        setChecked(value);
        setSleepLock (value);
    }

    useEffect(() => {
        if (isSupported) {
            if (checked && !isActive) request ();
            else if (!checked && isActive) release();
        }
      }), [checked, isSupported, isActive];
    
    return (
        <Stack direction={'row'} spacing={2} alignContent={'center'} alignItems={'center'}>
            <Typography variant={'h2'} >Blocage de la veille</Typography>
            <Switch disabled={!isSupported} checked={checked} onChange={(e) => handleChange(e.target.checked)} />
            {(isSupported)
            ? <Chip key={'active'} label={(isActive) ? 'Activé' : 'Désactivé'} color={(isActive) ? 'success' : 'warning'} />
            : <Chip key={'supported'} label={'Non Supporté'} color={'error'} />}
        </Stack>
    );
}