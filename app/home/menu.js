'use client';

import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@mui/material";
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { GiPoolTriangle } from "react-icons/gi";
import { _DEBUG } from '../../components/tools';
import { useTheme } from '@emotion/react';


export default function Menu () {
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const [value, setValue] = useState(pathname);
      
    function handleChangeMenu(event, newValue) {
        setValue(newValue);
        router.push(newValue);
    }
  
    return(
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
            <Divider />
            <BottomNavigation 
            sx={{ backgroundColor:theme.palette.background.paper, height: 100, paddingBottom: 5}}
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
