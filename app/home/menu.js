'use client';

import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { GiPoolTriangle } from "react-icons/gi";
import { useWakeLock } from 'react-screen-wake-lock';
import { _DEBUG } from '../lib/tools';


export default function Menu () {
    const [value, setValue] = useState('/games');
    const router = useRouter();
    const { isSupported, released, request, release } = useWakeLock({
        onRequest: () => _DEBUG('Screen Wake Lock: requested!'),
        onError: () => console.error('An error happened when requesting the screen wake lock.'),
        onRelease: () => _DEBUG('Screen Wake Lock: released!'),
    });
      
    function handleChangeMenu(event, newValue) {
        if (newValue === '/games') {
            request();
        } else {
            release();
        }
        setValue(newValue);
        router.push(newValue);
    }
  
    return(
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
            <Divider />
            <BottomNavigation 
            sx={{ height: 100, paddingBottom: 5}}
            showLabels
            value={value}
            onChange={handleChangeMenu} >
                <BottomNavigationAction value={'/games'} label="Jouer" icon={<GiPoolTriangle  fontSize={25} />} />
                <BottomNavigationAction value={'/users'} label="Joueurs" icon={<PeopleAltIcon />} />
                <BottomNavigationAction value={'/users/1'} label="Statisques" icon={<AssessmentOutlinedIcon />} />
                <BottomNavigationAction value={'/settings'} label="Paramètres" icon={<SettingsOutlinedIcon />} />
            </BottomNavigation>
        </Box>
    );
}
