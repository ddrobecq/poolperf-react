'use client';

import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { GiPoolTriangle } from "react-icons/gi";


export default function Menu () {
    const [value, setValue] = useState(0);
    const router = useRouter();
  
    function handleChangeMenu(event, newValue) {
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
