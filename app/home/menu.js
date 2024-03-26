'use client';

import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Menu (props) {
    const [value, setValue] = useState(0);
    const router = useRouter();
  
    function handleChangeMenu(event, newValue) {
      setValue(newValue);
      router.push(newValue);
    }
  
    return(
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={2}>
            <Divider />
            <BottomNavigation 
            sx={{ height: 100, paddingBottom: 5}}
            showLabels
            value={value}
            onChange={handleChangeMenu} >
                <BottomNavigationAction value={'/games'} label="Jouer" icon={<RestoreIcon />} />
                <BottomNavigationAction value={'/users'} label="Joueurs" icon={<RestoreIcon />} />
                <BottomNavigationAction value={'/users/1'} label="Statisques" icon={<RestoreIcon />} />
                <BottomNavigationAction value={'/settings'} label="Paramètres" icon={<RestoreIcon />} />
            </BottomNavigation>
        </Box>
    );

}